import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";
import { checkZeroFlag } from "../sub/checkZeroFlag";
import { increment } from "../sub/increment";
import { createHigherOrderWithExtensions } from "./createHigherOrderWithExtensions";
import { timed } from "./timed";

export const incrementRegister = (target: Register) =>
  createHigherOrderWithExtensions(
    timed(() => {
      increment(target);
      checkZeroFlag(target);
    }),
    {
      overflowingIntoRegister: (overflow: Register) =>
        timed(() => {
          increment(target);
          if (!registerSet[target]) {
            increment(overflow);
          }
        }),
    }
  );

interface IncrementRegister {
  (): void;
  overflowingIntoRegister: (overflow: Register) => () => void;
}
