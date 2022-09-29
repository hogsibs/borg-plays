import C8 from "../types/c8";
import { getX, getY } from "./common";

export default function setVxToVy(c8: C8, code: number) {
  c8.registers[getX(code)] = c8.registers[getY(code)];
}
