import applyCustomOperations from "./apply-custom-operations.js";
import buildOperationMap from "./build-operation-map.js";
import {
  memorySize,
  programCounterStartingPosition,
  registerCount,
  screenHeight,
  screenWidth,
} from "./constants.js";
import { copy } from "./copy.js";
import fontSet from "./font-set.js";
import defaultOperations from "./operations/index.js";
import type C8 from "./types/c8.js";
import CustomOperations from "./types/custom-operations.js";

const initializeC8 = (customOperations?: CustomOperations): C8 => {
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
    operationMap: buildOperationMap(
      customOperations
        ? applyCustomOperations(defaultOperations, customOperations)
        : defaultOperations
    ),
  };
  copy(fontSet, c8.memory);
  return c8;
};

export default initializeC8;
