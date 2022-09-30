import type { Operations } from "../operations/index.js";
import OperationExtension from "./operation-extension.js";

type CustomOperations = {
  [Operation in keyof Partial<Operations>]: OperationExtension;
};
export default CustomOperations;
