import { flagRegister } from "../constants";
import C8 from "../types/c8";
import { getX, getY } from "./common";

export default function setVxToVyMinusVx(c8: C8, code: number) {
  const x = getX(code);
  const difference = c8.registers[getY(code)] - c8.registers[x];
  c8.registers[x] = difference & 0xff;
  c8.registers[flagRegister] = difference >= 0 ? 1 : 0;
}
