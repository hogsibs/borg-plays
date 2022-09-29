import C8 from "../types/c8";
import { getX } from "./common";

export default function storeVxAsDecimalInMemory(c8: C8, code: number) {
  const value = c8.registers[getX(code)];
  c8.memory[c8.addressRegister] = Math.floor(value / 100);
  c8.memory[c8.addressRegister + 1] = Math.floor(value / 10) % 10;
  c8.memory[c8.addressRegister + 2] = value % 10;
}
