import fontSet from "./font-set";

export const screenWidth = 64;
export const screenHeight = 32;

const programCounterStartingPosition = 0x200;

export default interface Chip8 {
  memory: Uint8Array;
  registers: Uint8Array;
  stack: number[];
  display: boolean[];
  keys: number;
  programCounter: number;
  indexRegister: number;
  delayTimer: number;
  soundTimer: number;
}

export const initializeChip8 = (rom: Uint8Array): Chip8 => {
  const chip8: Chip8 = {
    memory: new Uint8Array(0x1000),
    registers: new Uint8Array(0x10),
    stack: [],
    display: new Array(screenWidth * screenHeight).fill(false),
    keys: 0,
    programCounter: programCounterStartingPosition,
    indexRegister: 0,
    delayTimer: 0,
    soundTimer: 0,
  };
  chip8.memory.set(fontSet);
  chip8.memory.set(rom, programCounterStartingPosition);
  return chip8;
};
