import type Operation from "./operation.js";

type OperationExtension = (
  base: Operation,
  ...params: Parameters<Operation>
) => void;
export default OperationExtension;
