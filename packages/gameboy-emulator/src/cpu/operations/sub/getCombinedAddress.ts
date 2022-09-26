import { registerSet } from "../../registerSet";
import { Register } from "../../types/Register";

export const getCombinedAddress = (firstHalf: Register, secondHalf: Register) =>
  registerSet[firstHalf] << (8 + registerSet[secondHalf]);
