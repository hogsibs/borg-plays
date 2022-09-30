import C8 from "../types/c8.js";
import { getX, getY } from "./common.js";

export default function setVxToVxOrVy(c8: C8, code: number) {
  const x = getX(code);
  c8.registers[x] = c8.registers[x] | c8.registers[getY(code)];
}
