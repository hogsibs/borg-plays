import goToNextInstruction from "../go-to-next-instruction";
import C8 from "../types/c8";
import { getX, getY } from "./common";

export default function skipNextIfVxNotEqualVy(c8: C8, code: number) {
  if (c8.registers[getX(code)] !== c8.registers[getY(code)]) {
    goToNextInstruction(c8);
  }
}