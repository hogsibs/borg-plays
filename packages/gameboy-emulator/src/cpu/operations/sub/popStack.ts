import { readByte } from "../../../mmu";
import { registerSet } from "../../registerSet";

export const popStack = () => readByte(registerSet.stackPointer++);
