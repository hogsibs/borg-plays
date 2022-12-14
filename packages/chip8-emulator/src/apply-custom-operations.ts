import { Operations } from "./operations/index.js";
import C8 from "./types/c8.js";
import CustomOperations from "./types/custom-operations.js";
import Operation from "./types/operation.js";

export default function applyCustomOperations(
  baseOperations: Operations,
  customOperations: CustomOperations
): Operations {
  return Object.fromEntries(
    Object.entries(baseOperations).map(applyCustomOperation)
  );

  function applyCustomOperation([name, operation]: [string, Operation]) {
    const operationName = name as keyof Operations;
    if (operationName in customOperations) {
      return [
        operationName,
        (c8: C8, code: number) =>
          customOperations[operationName]!(operation, c8, code),
      ];
    } else {
      return [operationName, operation];
    }
  }
}
