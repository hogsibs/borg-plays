import C8 from "../types/c8.js";
import { getX } from "./common.js";

export default function setDelayTimerToVx(c8: C8, code: number) {
  c8.delayTimer = c8.registers[getX(code)];
}
