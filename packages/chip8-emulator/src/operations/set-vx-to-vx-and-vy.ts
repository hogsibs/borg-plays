import C8 from "../types/c8";
import { getX, getY } from "./common";

export default function setVxToVxAndVy(c8: C8, code: number) {
  const x = getX(code);
  c8.registers[x] = c8.registers[x] & c8.registers[getY(code)];
}
