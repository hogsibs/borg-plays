import C8 from "../types/c8.js";
import { getX } from "./common.js";

export default function storeV0ThroughVxInMemory(c8: C8, code: number) {
  const x = getX(code);
  for (let i = 0; i <= x; i++) {
    c8.memory[c8.addressRegister + i] = c8.registers[i];
  }
}
