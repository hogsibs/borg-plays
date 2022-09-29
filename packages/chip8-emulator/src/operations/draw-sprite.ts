import { flagRegister, screenWidth } from "../constants";
import C8 from "../types/c8";
import { getN, getX, getY } from "./common";

const width = 8;
export default function drawSprite(c8: C8, code: number) {
  const spriteX = c8.registers[getX(code)];
  const spriteY = c8.registers[getY(code)];
  const height = getN(code);
  let flippedOff = false;
  for (let y = spriteY; y < spriteY + height; y++) {
    const rowPixels = c8.memory[c8.addressRegister + (y - spriteY)];
    for (let x = spriteX; x < spriteX + width; x++) {
      const shouldFlip = !!((rowPixels >> (7 - (x - spriteX))) & 1);
      if (shouldFlip) {
        const index = y * screenWidth + x;
        const isLit = !!c8.graphics[index];
        if (isLit) {
          flippedOff = true;
        }
        c8.graphics[index] = !isLit;
      }
    }
  }
  c8.registers[flagRegister] = flippedOff ? 1 : 0;
}
