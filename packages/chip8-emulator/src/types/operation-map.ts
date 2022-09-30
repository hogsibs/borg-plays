import Operation from "./operation.js";

export default interface OperationMap {
  selector: number;
  [code: number]: OperationMap | Operation;
}
