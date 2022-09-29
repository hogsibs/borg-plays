import { flagRegister } from "../constants";
import C8 from "../types/c8";
import { getX, getY } from "./common";

export default function addVyToVx(c8: C8, code: number) {
  const x = getX(code);
  const sum = c8.registers[x] + c8.registers[getY(code)];
  c8.registers[x] = sum & 0xff;
  c8.registers[flagRegister] = sum > 0xff ? 1 : 0;
}
