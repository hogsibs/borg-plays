import {
  memorySize,
  programCounterStartingPosition,
  registerCount,
  screenHeight,
  screenWidth,
} from "./constants";
import { copy } from "./copy";
import fontSet from "./font-set";
import type C8 from "./types/c8";

const initializeC8 = (): C8 => {
  const c8: C8 = {
    memory: new Uint8Array(memorySize),
    registers: new Uint8Array(registerCount),
    addressRegister: 0,
    programCounter: programCounterStartingPosition,
    graphics: Array.from({ length: screenWidth * screenHeight }, () => false),
    delayTimer: 0,
    soundTimer: 0,
    stack: [],
    keyPad: 0,
  };
  copy(fontSet, c8.memory);
  return c8;
};

export default initializeC8;
