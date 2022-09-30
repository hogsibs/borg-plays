import C8 from "../types/c8.js";
import { getX, getY } from "./common.js";

export default function setVxToVy(c8: C8, code: number) {
  c8.registers[getX(code)] = c8.registers[getY(code)];
}
