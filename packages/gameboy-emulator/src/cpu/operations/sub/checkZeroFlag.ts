import { zero } from "../../flags";
import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";
import { flag } from "./flag";

export const checkZeroFlag = (target: Register) => {
  registerSet.flags = 0;
  if (!registerSet[target]) {
    flag(zero);
  }
};
