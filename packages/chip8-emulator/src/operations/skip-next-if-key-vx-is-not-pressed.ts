import goToNextInstruction from "../go-to-next-instruction";
import C8 from "../types/c8";
import { getX } from "./common";

export default function skipNextIfKeyVxIsNotPressed(c8: C8, code: number) {
  if (c8.registers[getX(code)] & c8.keyPad) {
    goToNextInstruction(c8);
  }
}
