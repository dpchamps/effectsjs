import { TypesVisitorPrototype } from "./visitor-proto-interfaces";
import { Visitor, NodePath } from "@babel/traverse";
import BabelTypes, { ArrowFunctionExpression, isProgram } from "@babel/types";
import {
  arrowExpressionToGenerator,
  fixupParentGenerator,
} from "./traverse-utilities";
import { performVisitor } from "./perform-visitor";
import { util as effectsUtil } from "effects-common";

const { exists } = effectsUtil;

export const toGeneratorVisitor: Visitor<TypesVisitorPrototype> = {
  Function(path, { types }) {
    if (path.node.async) return;

    if (types.isArrowFunctionExpression(path.node)) {
      path.replaceWith(
        arrowExpressionToGenerator(
          types,
          path as NodePath<ArrowFunctionExpression>
        )
      );
    } else if (!path.node.generator) {
      path.node.generator = true;
    }

    const body = path.get("body");

    body?.traverse(yieldCallExpressionVisitor, { types });
    body?.traverse(callExpressionVisitor, { types });
    body?.traverse(performVisitor, { types });
  },
};

export const callExpressionVisitor: Visitor<TypesVisitorPrototype> = {
  CallExpression(path, { types }) {
    const parentFunction = path.findParent(types.isFunction) as NodePath<
      BabelTypes.Function
    >;
    const immediateParent = path.parent;
    if (
      parentFunction?.node.generator &&
      (types.isExpressionStatement(immediateParent) ||
        types.isVariableDeclarator(immediateParent))
    ) {
      const callee = (path.get("callee.name") as any).node;
      const binding = path.scope.getBinding(callee);

      if (binding && types.isFunctionDeclaration(binding.path.node)) {
        binding.path.node.generator = true;
      } else {
        binding?.path.traverse(toGeneratorVisitor, { types });
      }

      if (!types.isYieldExpression(path.node)) {
        path.replaceWith(types.yieldExpression(path.node));
      }
    }
  },
};

export const isYieldCandidate = (path: NodePath, types: typeof BabelTypes) => {
  const immediateParent = path.parentPath;
  if (
    types.isVariableDeclarator(immediateParent) &&
    types.isProgram(path.scope.block)
  )
    return false;

  if (
    types.isReturnStatement(immediateParent) ||
    types.isVariableDeclarator(immediateParent) ||
    (types.isExpressionStatement(immediateParent) &&
      types.isBlockStatement(path.parentPath?.parentPath))
  ) {
    return true;
  }

  return false;
};

export const toYieldExpression = (path, types) => {
  if (isProgram(path.parentPath)) return;
  path.replaceWith(types.yieldExpression(path.node));

  fixupParentGenerator(path, types);
};

export const yieldCallExpressionVisitor: Visitor<TypesVisitorPrototype> = {
  CallExpression(path, { types, skipChildTraversal }) {
    const immediateParent = path.parent;
    if (types.isYieldExpression(immediateParent)) return;

    toYieldExpression(path, types);

    if (exists(skipChildTraversal) && Boolean(skipChildTraversal)) {
      path.skip();
    }
  },
};
