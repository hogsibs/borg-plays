import goToNextInstruction from "../go-to-next-instruction";
import C8 from "../types/c8";
import { getX } from "./common";

export default function skipNextIfKeyVxIsNotPressed(c8: C8, code: number) {
  const key = 1 << c8.registers[getX(code)];
  if ((key & c8.keyPad) !== key) {
    goToNextInstruction(c8);
  }
}
