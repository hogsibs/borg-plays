import { decrementRegister } from "./higherOrder/decrementRegister";
import { incrementRegister } from "./higherOrder/incrementRegister";
import { loadMemory } from "./higherOrder/loadMemory";
import { loadRegister } from "./higherOrder/loadRegister";
import { rotateRegister } from "./higherOrder/rotateRegister";
import { noOp } from "./noOp";

export const map: (() => void)[] = [
  // 00
  noOp,
  loadMemory.atProgramCounter.intoRegisters("c", "b"),
  loadRegister("a").intoMemoryAt("b", "c"),
  incrementRegister("c").overflowingIntoRegister("b"),
  incrementRegister("b"),
  decrementRegister("b"),
  loadMemory.atProgramCounter.intoRegister("b"),
  rotateRegister("a"),
];
