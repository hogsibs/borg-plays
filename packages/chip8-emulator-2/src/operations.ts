import { fontHeight } from "./font-set";
import Chip8, { screenHeight, screenWidth } from "./chip8";

const flagRegister = 0xf;

// control flow
export function callSubroutine(chip8: Chip8, nnn: number) {
  chip8.stack.push(chip8.programCounter);
  chip8.programCounter = nnn;
}
export function returnFromSubroutine(chip8: Chip8) {
  if (chip8.stack.length === 0) {
    throw new Error(`stack underflow`);
  }
  chip8.programCounter = chip8.stack.pop()!;
}
export function jump(chip8: Chip8, nnn: number) {
  chip8.programCounter = nnn;
}
export function jumpWithOffset(chip8: Chip8, nnn: number) {
  chip8.programCounter = nnn + chip8.registers[0];
}
// conditions
export function ifEqual(chip8: Chip8, x: number, y: number) {
  if (chip8.registers[x] === chip8.registers[y]) {
    chip8.programCounter += 2;
  }
}
export function ifEqualConst(chip8: Chip8, x: number, nn: number) {
  if (chip8.registers[x] === nn) {
    chip8.programCounter += 2;
  }
}
export function ifNotEqual(chip8: Chip8, x: number, y: number) {
  if (chip8.registers[x] !== chip8.registers[y]) {
    chip8.programCounter += 2;
  }
}
export function ifNotEqualConst(chip8: Chip8, x: number, nn: number) {
  if (chip8.registers[x] !== nn) {
    chip8.programCounter += 2;
  }
}
// arithmetic and assignment
export function assign(chip8: Chip8, x: number, y: number) {
  chip8.registers[x] = chip8.registers[y];
}
export function assignConst(chip8: Chip8, x: number, nn: number) {
  chip8.registers[x] = nn;
}
export function bitwiseOrAssignment(chip8: Chip8, x: number, y: number) {
  chip8.registers[x] |= chip8.registers[y];
}
export function bitwiseAndAssignment(chip8: Chip8, x: number, y: number) {
  chip8.registers[x] &= chip8.registers[y];
}
export function bitwiseXorAssignment(chip8: Chip8, x: number, y: number) {
  chip8.registers[x] ^= chip8.registers[y];
}
export function additionAssignment(chip8: Chip8, x: number, y: number) {
  chip8.registers[flagRegister] = ((chip8.registers[x] += chip8.registers[y]) >
    0xff) as any;
}
export function additionAssignmentConst(chip8: Chip8, x: number, nn: number) {
  chip8.registers[x] += nn;
}
export function subtractionAssignment(chip8: Chip8, x: number, y: number) {
  chip8.registers[flagRegister] = ((chip8.registers[x] -= chip8.registers[y]) >=
    0) as any;
}
export function subtractionAssignmentLeft(chip8: Chip8, x: number, y: number) {
  chip8.registers[flagRegister] = ((chip8.registers[x] =
    chip8.registers[y] - chip8.registers[x]) >= 0) as any;
}
export function leftShift(chip8: Chip8, x: number, y: number) {
  const vy = chip8.registers[y];
  chip8.registers[x] = vy << 1;
  chip8.registers[flagRegister] = vy >> 7;
}
export function rightShift(chip8: Chip8, x: number, y: number) {
  const vy = chip8.registers[y];
  chip8.registers[x] = vy >> 1;
  chip8.registers[flagRegister] = vy & 1;
}
export function random(chip8: Chip8, x: number, nn: number) {
  chip8.registers[x] = Math.floor(Math.random() * 0xff) & nn;
}
// memory
export function index(chip8: Chip8, nnn: number) {
  chip8.indexRegister = nnn;
}
export function incrementIndex(chip8: Chip8, x: number) {
  chip8.indexRegister += chip8.registers[x];
}
export function selectFontCharacter(chip8: Chip8, x: number) {
  chip8.indexRegister = chip8.registers[x] * fontHeight;
}
export function binaryDecimalConversion(chip8: Chip8, x: number) {
  const value = chip8.registers[x];
  chip8.memory[chip8.indexRegister] = Math.floor(value / 100);
  chip8.memory[chip8.indexRegister + 1] = Math.floor(value / 10) % 10;
  chip8.memory[chip8.indexRegister + 2] = value % 10;
}
export function storeMemory(chip8: Chip8, x: number) {
  chip8.memory.set(chip8.registers.slice(0, x + 1), chip8.indexRegister);
}
export function loadMemory(chip8: Chip8, x: number) {
  chip8.registers.set(
    chip8.memory.slice(chip8.indexRegister, chip8.indexRegister + x + 1)
  );
}
// display
export function clearDisplay(chip8: Chip8) {
  chip8.display.fill(false);
}
export function drawSprite(chip8: Chip8, x: number, y: number, n: number) {
  const xCoord = chip8.registers[x] % screenWidth;
  const yCoord = chip8.registers[y] % screenHeight;
  const sprite = chip8.memory.slice(
    chip8.indexRegister,
    chip8.indexRegister + Math.min(screenHeight - yCoord, n)
  );
  chip8.registers[flagRegister] = 0;
  sprite.forEach((spriteRow, row) => {
    for (
      let column = 0;
      column < 8 && xCoord + column < screenWidth;
      ++column
    ) {
      const pixel = (spriteRow >> (7 - column)) & 1;
      if (pixel) {
        const screenIndex = (yCoord + row) * screenWidth + (xCoord + column);
        if (chip8.display[screenIndex]) {
          chip8.display[screenIndex] = false;
          chip8.registers[flagRegister] = 1;
        } else {
          chip8.display[screenIndex] = true;
        }
      }
    }
  });
}
// input
export function ifKeyPressed(chip8: Chip8, x: number) {
  if ((chip8.keys >> chip8.registers[x]) & 1) {
    chip8.programCounter += 2;
  }
}
export function ifKeyNotPressed(chip8: Chip8, x: number) {
  if ((chip8.keys >> chip8.registers[x]) ^ 1) {
    chip8.programCounter += 2;
  }
}
// timer
export function readTimer(chip8: Chip8, x: number) {
  chip8.registers[x] = chip8.delayTimer;
}
export function writeTimer(chip8: Chip8, x: number) {
  chip8.delayTimer = chip8.registers[x];
}
// audio
export function playSound(chip8: Chip8, x: number) {
  chip8.soundTimer = chip8.registers[x];
}
