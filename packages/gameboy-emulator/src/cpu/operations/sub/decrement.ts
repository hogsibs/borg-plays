import { maxByte } from "../../constants";
import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";

export const decrement = (target: Register) =>
  (registerSet[target] = (registerSet[target] - 1) & maxByte);