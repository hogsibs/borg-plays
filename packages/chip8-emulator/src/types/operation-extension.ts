import type Operation from "./operation";

type OperationExtension = (
  base: Operation,
  ...params: Parameters<Operation>
) => void;
export default OperationExtension;
