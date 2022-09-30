import type OperationMap from "../types/operation-map";

export default interface C8 {
  memory: Uint8Array;
  registers: Uint8Array;
  addressRegister: number;
  programCounter: number;
  graphics: Array<boolean>;
  delayTimer: number;
  soundTimer: number;
  stack: number[];
  keyPad: number;
  operationMap: OperationMap;
}
