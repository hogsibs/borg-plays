import { c8 } from "./c8";
import { screenHeight, screenWidth } from "./emulator";
import { debugGraphics } from "./debugGraphics";

const operations: OperationMap = {
  selector: () => c8.operationCode >> 12,
  0x0: {
    selector: () =>
      (c8.operationCode & 0xe0) === c8.operationCode
        ? 0xe0
        : (c8.operationCode & 0xee) === c8.operationCode
        ? 0xee
        : 0,
    0xee: () => {
      c8.stackPointer--;
      c8.programCounter = c8.stack[c8.stackPointer];
    },
  },
  0x1: () => {
    c8.programCounter = c8.operationCode & 0xfff;
  },
  0x2: () => {
    c8.stack[c8.stackPointer] = c8.programCounter;
    c8.stackPointer++;
    c8.programCounter = c8.operationCode & 0x0fff;
  },
  0x3: () => {
    const x = (c8.operationCode >> 8) & 0xf;
    const value = c8.operationCode & 0xff;
    if (c8.registers[x] === value) {
      c8.programCounter += 2;
    }
  },
  0x4: () => {
    const x = (c8.operationCode >> 8) & 0xf;
    const value = c8.operationCode & 0xff;
    if (x !== value) {
      c8.programCounter += 2;
    }
  },
  0x6: () => {
    const x = (c8.operationCode >> 8) & 0xf;
    c8.registers[x] = c8.operationCode & 0xff;
  },
  0x7: () => {
    const x = (c8.operationCode >> 8) & 0xf;
    const value = c8.operationCode & 0xff;
    c8.registers[x] = (c8.registers[x] + value) & 0xff;
  },
  0x8: {
    selector: () => c8.operationCode & 0xf,
    0x2: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      const y = (c8.operationCode >> 4) & 0xf;
      c8.registers[x] = c8.registers[x] & c8.registers[y];
    },
    0x4: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      const y = (c8.operationCode >> 4) & 0xf;
      c8.registers[0xf] = c8.registers[x] > 0xff - c8.registers[y] ? 1 : 0;
      c8.registers[x] = (c8.registers[x] + c8.registers[y]) & 0xff;
    },
  },
  0xa: () => {
    c8.indexRegister = c8.operationCode & 0x0fff;
  },
  0xc: () => {
    const x = (c8.operationCode >> 8) & 0xf;
    const value = c8.operationCode & 0xff;
    const result = Math.floor(Math.random() * 0x100) & value;
    c8.registers[x] = result;
  },
  0xd: () => {
    debugGraphics();
    const coordX = c8.registers[(c8.operationCode >> 8) & 0xf] - 1;
    const coordY = c8.registers[(c8.operationCode >> 4) & 0xf];
    const height = c8.operationCode & 0xf;
    let atLeastOneSwitch = false;
    for (let y = coordY; y < coordY + height && y < screenHeight; y++) {
      const rowPixels = c8.memory[c8.indexRegister + (y - coordY)];
      for (let x = coordX; x < coordX + 8 && x < screenWidth; x++) {
        const isFilled = !!((1 << (7 - (x - coordX))) & rowPixels);
        if (c8.graphics[y * screenWidth + x] !== isFilled) {
          if (!atLeastOneSwitch) {
            atLeastOneSwitch = true;
          }
          c8.graphics[y * screenWidth + x] = isFilled;
        }
      }
    }
    c8.registers[0xf] = atLeastOneSwitch ? 1 : 0;
  },
  0xe: {
    selector: () => c8.operationCode & 0xff,
    0xa1: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      if (!(c8.keyPad & c8.registers[x])) {
        c8.programCounter += 2;
      }
    },
  },
  0xf: {
    selector: () => c8.operationCode & 0xff,
    0x07: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      c8.registers[x] = c8.delayTimer;
    },
    0x15: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      c8.delayTimer = c8.registers[x];
    },
    0x29: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      c8.indexRegister = c8.registers[x] * 5;
    },
    0x33: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      const value = c8.registers[x];
      c8.memory[c8.indexRegister] = Math.floor(value / 100);
      c8.memory[c8.indexRegister + 1] = Math.floor(value / 10) % 10;
      c8.memory[c8.indexRegister + 2] = value % 10;
    },
    0x65: () => {
      const x = (c8.operationCode >> 8) & 0xf;
      for (let i = 0; i < x; i++) {
        c8.registers[i] = c8.memory[c8.indexRegister + i];
      }
    },
  },
};

export function executeOperation() {
  console.log(`executing operation ${c8.operationCode.toString(16)}`);
  let map: OperationMap | (() => void) = operations;
  while ("selector" in map) {
    const subCode = map.selector();
    if (subCode in map) {
      map = map[subCode];
    } else {
      throw new Error(`Unknown operation: ${c8.operationCode.toString(16)}`);
    }
  }
  map();
}

interface OperationMap {
  selector: () => number;
  [code: number]: OperationMap | (() => void);
}
