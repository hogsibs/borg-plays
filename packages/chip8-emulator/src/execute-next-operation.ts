import { concatenateBytes } from "./bit-operations.js";
import goToNextInstruction from "./go-to-next-instruction.js";
import type OperationMap from "./types/operation-map.js";
import C8 from "./types/c8.js";

export default function executeNextOperation(c8: C8) {
  const operationCode = concatenateBytes(
    c8.memory[c8.programCounter],
    c8.memory[c8.programCounter + 1]
  );
  goToNextInstruction(c8);
  return executeOperation(c8, c8.operationMap, operationCode);
}

const executeOperation = (
  c8: C8,
  operationMap: OperationMap,
  operationCode: number
): void | 0 => {
  const query = operationCode & operationMap.selector;
  if (!(query in operationMap)) {
    throw new Error(
      `Could not process operation code: ${operationCode.toString(16)}`
    );
  }
  const target = operationMap[query];
  if ("selector" in target) {
    return executeOperation(c8, target, operationCode);
  } else {
    return target(c8, operationCode);
  }
};
