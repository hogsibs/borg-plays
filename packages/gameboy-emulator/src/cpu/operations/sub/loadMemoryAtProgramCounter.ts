import { readByte } from "../../../mmu";
import { registerSet } from "../../registerSet";

export const loadMemoryAtProgramCounter = () =>
  readByte(registerSet.programCounter++);
