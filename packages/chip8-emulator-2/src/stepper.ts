import type Chip8 from "./chip8";
import * as defaultOperations from "./operations";

export { defaultOperations };
export type Operations = typeof defaultOperations;

const stepper =
  (operations: Operations = defaultOperations) =>
  (chip8: Chip8): void => {
    // fetch
    const firstByte = chip8.memory[chip8.programCounter++];
    const nn = chip8.memory[chip8.programCounter++];

    // decode
    const instruction = firstByte >> 4;
    const x = firstByte & 0xf;
    const y = nn >> 4;
    const n = nn & 0xf;
    const nnn = (x << 8) | nn;

    // execute
    switch (instruction) {
      case 0x0:
        switch (nnn) {
          case 0x0e0:
            operations.clearDisplay(chip8);
            break;
          case 0x0ee:
            operations.returnFromSubroutine(chip8);
            break;
          default:
            throw new Error(`no machine language CPU`);
        }
        break;
      case 0x1:
        operations.jump(chip8, nnn);
        break;
      case 0x2:
        operations.callSubroutine(chip8, nnn);
        break;
      case 0x3:
        operations.ifEqualConst(chip8, x, nn);
        break;
      case 0x4:
        operations.ifNotEqualConst(chip8, x, nn);
        break;
      case 0x5:
        operations.ifEqual(chip8, x, y);
        break;
      case 0x6:
        operations.assignConst(chip8, x, nn);
        break;
      case 0x7:
        operations.additionAssignmentConst(chip8, x, nn);
        break;
      case 0x8:
        switch (n) {
          case 0x0:
            operations.assign(chip8, x, y);
            break;
          case 0x1:
            operations.bitwiseOrAssignment(chip8, x, y);
            break;
          case 0x2:
            operations.bitwiseAndAssignment(chip8, x, y);
            break;
          case 0x3:
            operations.bitwiseXorAssignment(chip8, x, y);
            break;
          case 0x4:
            operations.additionAssignment(chip8, x, y);
            break;
          case 0x5:
            operations.subtractionAssignment(chip8, x, y);
            break;
          case 0x6:
            operations.rightShift(chip8, x, y);
            break;
          case 0x7:
            operations.subtractionAssignmentLeft(chip8, x, y);
            break;
          case 0xe:
            operations.leftShift(chip8, x, y);
            break;
        }
        break;
      case 0x9:
        operations.ifNotEqual(chip8, x, y);
        break;
      case 0xa:
        operations.index(chip8, nnn);
        break;
      case 0xb:
        operations.jumpWithOffset(chip8, nnn);
        break;
      case 0xc:
        operations.random(chip8, x, nn);
        break;
      case 0xd:
        operations.drawSprite(chip8, x, y, n);
        break;
      case 0xe:
        switch (nn) {
          case 0x9e:
            operations.ifKeyPressed(chip8, x);
            break;
          case 0xa1:
            operations.ifKeyNotPressed(chip8, x);
            break;
        }
        break;
      case 0xf:
        switch (nn) {
          case 0x07:
            operations.readTimer(chip8, x);
            break;
          case 0x15:
            operations.writeTimer(chip8, x);
            break;
          case 0x18:
            operations.playSound(chip8, x);
            break;
          case 0x1e:
            operations.incrementIndex(chip8, x);
            break;
          case 0x29:
            operations.selectFontCharacter(chip8, x);
            break;
          case 0x33:
            operations.binaryDecimalConversion(chip8, x);
            break;
          case 0x55:
            operations.storeMemory(chip8, x);
            break;
          case 0x65:
            operations.loadMemory(chip8, x);
            break;
        }
    }
  };

export default stepper;
