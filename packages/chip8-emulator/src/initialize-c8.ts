import applyCustomOperations from "./apply-custom-operations";
import buildOperationMap from "./build-operation-map";
import {
  memorySize,
  programCounterStartingPosition,
  registerCount,
  screenHeight,
  screenWidth,
} from "./constants";
import { copy } from "./copy";
import fontSet from "./font-set";
import defaultOperations from "./operations";
import type C8 from "./types/c8";
import CustomOperations from "./types/custom-operations";

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
