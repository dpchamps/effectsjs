import { NodePath, Visitor } from "@babel/traverse";
import BabelTypes, {
  ArrowFunctionExpression,
  AssignmentExpression,
  BlockStatement,
  CallExpression,
  Identifier,
  ObjectExpression,
  ObjectPattern,
  ObjectProperty,
  Literal,
  VariableDeclarator,
  Expression,
  ExpressionStatement
} from "@babel/types";
import { Babel } from "./plugin";
import { yieldCallExpressionVisitor } from "./to-generator-visitor";
import { TypesVisitorPrototype } from "./visitor-proto-interfaces";

export const hasEffectsDirective = (path: NodePath<BabelTypes.Function>) => {
  const directives = path.get("body.directives") as NodePath[];
  if (!Array.isArray(directives)) return;

  return directives
    ?.map(directive => {
      return ((directive.get("value.value") as NodePath)
        ?.node as unknown) as string;
    })
    .includes("use effects");
};

export const arrowExpressionToGenerator = (
  types: Babel["types"],
  path: NodePath<ArrowFunctionExpression>
) => {
  // TODO: [major] - More care needs to be taken here:
  //  We can't just convert the arrow function over to a generator. We need to perserve the current "this"
  //  into "self" and pass it in.

  return types.functionExpression(
    undefined,
    path.node.params,
    path.node.body as BabelTypes.BlockStatement,
    true,
    path.node.async
  );
};

// Starting from a child path, find the parent function and convert it to a generator.
// Because we cannot predict what the value of call expressions will be, we must yield them to the stack interpreter.
export const fixupParentGenerator = (path: NodePath, types: Babel["types"]) => {
  const parentFunctionPath = path.findParent((x: any) =>
    x.isFunction()
  ) as NodePath<BabelTypes.Function>;

  if (!parentFunctionPath) {
    // TODO: Think about what needs to be done here... Can we safely just return?
    return;
  }

  if (hasEffectsDirective(parentFunctionPath)) return;

  if (!parentFunctionPath?.node?.generator) {
    if (types.isArrowFunctionExpression(parentFunctionPath.node)) {
      parentFunctionPath.replaceWith(
        arrowExpressionToGenerator(
          types,
          parentFunctionPath as NodePath<ArrowFunctionExpression>
        )
      );
    } else {
      parentFunctionPath.node.generator = true;
    }

    // Yield all internal call expressions
    parentFunctionPath
      .get("body")
      ?.traverse(yieldCallExpressionVisitor, { types });

    const name = types.isFunctionDeclaration(parentFunctionPath.node)
      ? parentFunctionPath.node.id?.name
      : (parentFunctionPath.parentPath.node as any)?.id?.name;

    if (name) {
      const bindingScope = parentFunctionPath.findParent(x =>
        x.scope.hasBinding(name)
      );

      bindingScope.scope
        .getBinding(name)
        ?.referencePaths.forEach((reference: any) => {
          const expStatementParent =
            reference.findParent(types.isExpressionStatement) ||
            reference.parentPath;

          if (!expStatementParent) return;

          const isYield = types.isYieldExpression(
            expStatementParent.get("expression")
          );

          if (!isYield) {
            const callExpression = reference.findParent(
              types.isCallExpression
            ) as NodePath<CallExpression>;

            callExpression?.replaceWith(
              types.yieldExpression(callExpression.node)
            );
          }
        });
    }
  }
};

export const toMemberExpressionVisitor: Visitor<{
  objectIdentifier: Identifier;
  propName: string;
  types: Babel["types"];
}> = {
  Identifier(path, { objectIdentifier, propName, types }) {
    if (path.node.name === propName) {
      path.replaceWith(types.memberExpression(objectIdentifier, path.node));
      path.skip();
    }
  }
};

export const renameIdentNameVisitor: Visitor<{
  newName: string;
  oldName: string;
}> = {
  Identifier(path, { newName, oldName }) {
    if (path.node.name === oldName) {
      path.node.name = newName;
    }
  }
};

// Convert a destructured default into
// object.prop = typeof object.prop !== 'undefined' ? object.prop : 'default'
// TODO: Double check the spec to make sure this is BTB (by the books).
export const createDefaultAssignment = (
  objectIdent: Identifier,
  objectProp: ObjectProperty,
  types: Babel["types"]
) => {
  if (
    types.isRestElement(objectProp) ||
    !types.isAssignmentPattern(objectProp.value)
  ) {
    throw new Error(`[Babel Plugin Effects Error]`);
  }

  return types.expressionStatement(
    types.assignmentExpression(
      "=",
      types.memberExpression(objectIdent, objectProp.key),
      types.conditionalExpression(
        types.binaryExpression(
          "!==",
          types.unaryExpression(
            "typeof",
            types.memberExpression(objectIdent, objectProp.key),
            true
          ),
          types.stringLiteral("undefined")
        ),
        types.memberExpression(objectIdent, objectProp.key),
        objectProp.value.right
      )
    )
  );
};

export const collapseObjectPattern = (
  handlerParam: ObjectPattern,
  types: Babel["types"],
  handlerBodyPath: NodePath
): { identifier: Identifier; defaultAssignments: ExpressionStatement[] } => {
  const identifierName = `e`;
  const defaultAssignments: ExpressionStatement[] = [];
  const objectIdentifier = types.identifier(identifierName);

  for (const property of handlerParam.properties) {
    if (
      !types.isRestElement(property) &&
      types.isAssignmentPattern(property.value)
    ) {
      defaultAssignments.push(
        createDefaultAssignment(objectIdentifier, property, types)
      );
    }

    if (types.isRestElement(property)) {
      handlerBodyPath.traverse(renameIdentNameVisitor, {
        newName: identifierName,
        oldName: (property.argument as Identifier).name
      });
    } else {
      handlerBodyPath.traverse(toMemberExpressionVisitor, {
        objectIdentifier,
        propName: property.key.name,
        types
      });
    }
  }

  return { identifier: objectIdentifier, defaultAssignments };
};
