export const c8 = {
  operationCode: 0,
  memory: new Uint8Array(),
  registers: new Uint8Array(),
  indexRegister: 0,
  programCounter: 0,
  graphics: new Array<boolean>(),
  delayTimer: 0,
  soundTimer: 0,
  stack: new Uint16Array(),
  stackPointer: 0,
  keyPad: 0,
  drawFlag: false,
};
