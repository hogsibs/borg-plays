import Operation from "./operation";

export default interface OperationMap {
  selector: number;
  [code: number]: OperationMap | Operation;
}
