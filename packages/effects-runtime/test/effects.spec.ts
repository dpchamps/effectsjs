import {
  stackResume,
  runProgram,
  performEffect,
  withHandler,
  UnhandledEffectError,
  DefaultEffectHandler,
} from "../src/runtime";
import { Handler } from "effects-common";
import {
  getHandler,
  addHandler,
  addReturn,
  setRootContinuation,
} from "effects-common/lib/StackFrame";

describe("Effects Unit Tests", () => {
  describe("stackResume", () => {
    it("Should return identity when input is not a generator", async () => {
      const data = (Symbol("Data") as unknown) as Generator;

      await expect(stackResume(data)).resolves.toBe(data);
    });

    it("Should run a generator until completion", async () => {
      function* test() {
        yield 1;
        yield 2;
        yield 3;
      }

      const testInstance = test();

      await stackResume(testInstance);

      expect(testInstance.next()).toEqual({
        value: undefined,
        done: true,
      });
    });

    it("Should run a generator with values yielded", () => {
      function* test() {
        const valA = yield 1;
        expect(valA).toBe(1);
        const valB = yield 2;
        expect(valB).toBe(2);
        const valC = yield 3;
        expect(valC).toBe(3);
      }

      stackResume(test());
    });

    it(`Should call a continuation yielded by a generator with the generator as it's only argument`, async () => {
      const spy = jest.fn();
      function* test() {
        yield spy;
      }
      const testInstance = test();

      await stackResume(testInstance);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(testInstance);
    });

    it(`Should resume a generator yielded by a generator`, async () => {
      const childSpy = jest.fn();

      function* parent() {
        yield child();
      }

      function* child() {
        childSpy();
        yield;
        childSpy();
      }

      await stackResume(parent());

      expect(childSpy).toHaveBeenCalledTimes(2);
    });

    it(`Should preserve execution order of parent/child frames`, async () => {
      const executionOrder: any[] = [];
      const addExecution = (input: any) => void executionOrder.push(input);

      function* parent() {
        addExecution("parent1");
        yield child();
        addExecution("parent2");
      }

      function* child() {
        addExecution("child1");
        yield;
        addExecution("child2");
        yield;
      }

      await stackResume(parent());

      expect(executionOrder).toMatchSnapshot([
        "parent1",
        "child1",
        "child2",
        "parent2",
      ]);
    });

    it(`Should return the result of the child frame to the parent `, async () => {
      expect.assertions(1);
      const result = Symbol();
      function* parent() {
        const value = yield child();

        expect(value).toBe(result);
      }

      function* child() {
        yield;

        return result;
      }

      await stackResume(parent());
    });

    it(`Should call the return frame if the return frame is a continuation`, async () => {
      const result = Symbol();
      function* test() {
        yield;

        return result;
      }

      const testInstance = test();
      const continuation = jest.fn();

      addReturn(testInstance, continuation);

      await stackResume(testInstance);

      expect(continuation).toHaveBeenCalledWith(result);
    });

    it(`Should throw an error should no root continuation exist`, async () => {
      function* test() {
        yield;
        throw new Error("Error");
      }

      await expect(stackResume(test())).rejects.toThrowError("Error");
    });

    it(`Should pass an error onto the root continuation if it exists`, async () => {
      const error = new Error("Error");
      function* test() {
        yield;
        throw error;
      }

      const rootContinuation = jest.fn();
      const program = test();

      setRootContinuation(rootContinuation);
      addReturn(program, rootContinuation);

      await expect(stackResume(program)).resolves.not.toThrow();

      expect(rootContinuation).toHaveBeenCalledWith(error);
    });
  });

  describe("runProgram", () => {
    it("Should run a generator through the interpreter", () => {
      expect.assertions(2);

      function* main() {
        expect(true).toBeTruthy();
        yield;
        expect(true).toBeTruthy();
      }

      runProgram(main());
    });
  });

  describe("withHandler", () => {
    it("Should return a frame with handler field", () => {
      const handler: Handler = {
        *handle(data, resume) {},
      };
      function* main() {}

      const program = main();
      const frame = withHandler(handler, program);

      expect(getHandler(frame, "handle")).toBe(handler.handle);
    });

    it("Should return a frame that yields the input frame as its only action", () => {
      const handler = {
        *handle() {},
      };
      function* main() {}
      const program = main();

      const handlerFrame = withHandler(handler, program);

      const { value } = handlerFrame.next();

      expect(value).toBe(program);
    });
  });

  describe("perform", () => {
    it("Should throw when a frame performs an effect that has not be handled", async () => {
      const performContinuation = performEffect({ type: "nonexist" });
      const mockFrame = function* () {};

      await expect(performContinuation(mockFrame())).rejects.toThrowError(
        UnhandledEffectError
      );
    });

    it("Should perform a default effect handler", async () => {
      const handlerSpy = jest.fn();
      const handler: Handler = {
        *[DefaultEffectHandler](_, resume) {
          handlerSpy();
          resume();
        },
      };

      const controlFrame = (function* () {
        yield performEffect({ type: undefined });
      })();

      addHandler(controlFrame, handler);

      await stackResume(controlFrame);

      expect(handlerSpy).toHaveBeenCalledTimes(1);
    });

    it("Should call an effect handler", async () => {
      const handlerSpy = jest.fn();
      const handler: Handler = {
        *test(_, resume) {
          handlerSpy();
          resume();
        },
      };

      const controlFrame = (function* main() {
        yield performEffect({ type: "test" });
      })();

      addHandler(controlFrame, handler);
      await stackResume(controlFrame);

      expect(handlerSpy).toHaveBeenCalled();
    });

    it("Should pass an effect handler data from the current frame", async () => {
      const handlerSpy = jest.fn();
      const expectedValue = Symbol();
      const handler: Handler = {
        *test(data, resume) {
          handlerSpy(data);
          return yield resume();
        },
      };

      const controlFrame = (function* main() {
        yield performEffect({ type: "test", data: expectedValue });
      })();

      addHandler(controlFrame, handler);
      await stackResume(controlFrame);

      expect(handlerSpy).toHaveBeenCalledWith({ data: expectedValue });
    });

    it("Should pass an data from the effect handler back to the control frame", async () => {
      const controlFrameSpy = jest.fn();
      const expectedValue = Symbol();
      const handler: Handler = {
        *test(_, resume) {
          return yield resume(expectedValue);
        },
      };

      const controlFrame = (function* main() {
        const result = yield performEffect({
          type: "test",
          data: expectedValue,
        });
        controlFrameSpy(result);
      })();

      addHandler(controlFrame, handler);
      await stackResume(controlFrame);

      expect(controlFrameSpy).toHaveBeenCalledWith(expectedValue);
    });

    it("Should fire arbitrary continuations before passing control back to the control frame", async () => {
      const continuationSpy = jest.fn();
      const controlFrameSpy = jest.fn();

      const handler: Handler = {
        *test(_, resume) {
          yield async (handler) => {
            continuationSpy();
            await stackResume(handler);
          };

          yield async (handler) => {
            continuationSpy();
            await stackResume(handler);
          };

          return yield resume();
        },
      };

      const controlFrame = (function* main() {
        yield performEffect({ type: "test" });
        controlFrameSpy();
      })();

      addHandler(controlFrame, handler);
      await stackResume(controlFrame);

      expect(continuationSpy).toHaveBeenCalledTimes(2);

      expect(controlFrameSpy).toHaveBeenCalledTimes(1);
      expect(continuationSpy.mock.invocationCallOrder[1]).toBeLessThan(
        controlFrameSpy.mock.invocationCallOrder[0]
      );
    });

    it("Should pass data computed in continuations back to the handler", (done) => {
      expect.assertions(1);
      const expectedResult = Symbol();

      const handler: Handler = {
        *test(_, resume) {
          const result = yield (handler) => {
            setTimeout(() => {
              stackResume(handler, expectedResult);
            }, 1);
          };

          return yield resume(result);
        },
      };

      const controlFrame = (function* main() {
        const result = yield performEffect({ type: "test" });

        expect(result).toBe(expectedResult);
      })();

      addHandler(controlFrame, handler);
      addReturn(controlFrame, done);

      stackResume(controlFrame);
    });

    it("Should handle symbol-y typed effect-handles", async () => {
      const handlerType = Symbol();
      const expectedResult = Symbol();

      const handler: Handler = {
        *[handlerType](_, resume) {
          return yield resume(expectedResult);
        },
      };

      const controlFrame = (function* main() {
        return yield performEffect({ type: handlerType });
      })();

      addHandler(controlFrame, handler);

      await expect(stackResume(controlFrame)).resolves.toBe(expectedResult);
    });

    it("Should catch unhandled symbol-y typed effect-handlers", async () => {
      await expect(
        stackResume(
          (function* main() {
            return yield performEffect({ type: Symbol("oh noes") });
          })()
        )
      ).rejects.toThrowError(
        "Encountered an unhandled effect :Symbol(oh noes)"
      );
    });
  });
});
