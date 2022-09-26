import { writeByte } from "../../../mmu";
import { registerSet } from "../../registerSet";
import type { Register } from "../../types/Register";

export const pushRegisterToStack = (register: Register) => {
  registerSet.stackPointer--;
  writeByte(registerSet.stackPointer, registerSet[register]);
};
