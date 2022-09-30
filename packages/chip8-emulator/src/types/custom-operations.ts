import type { Operations } from "../operations";
import OperationExtension from "./operation-extension";

type CustomOperations = {
  [Operation in keyof Partial<Operations>]: OperationExtension;
};
export default CustomOperations;
