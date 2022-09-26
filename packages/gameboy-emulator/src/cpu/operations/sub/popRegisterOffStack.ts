import { readByte } from "../../../mmu";
import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";

export const popRegisterOffStack = (register: Register) => {
  registerSet[register] = readByte(registerSet.stackPointer);
  registerSet.stackPointer++;
};
