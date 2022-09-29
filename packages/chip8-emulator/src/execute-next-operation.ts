import { concatenateBytes } from "./bit-operations";
import addNnToVx from "./operations/add-nn-to-vx";
import addVyToVx from "./operations/add-vy-to-vx";
import callSubroutineAtNnn from "./operations/call-subroutine-at-nnn";
import drawSprite from "./operations/draw-sprite";
import skipNextIfVxEqualsNn from "./operations/skip-next-if-vx-equals-nn";
import jumpToNnn from "./operations/jump-to-nnn";
import loadMemoryIntoV0ThroughVx from "./operations/load-memory-into-v0-through-vx";
import returnFromSubroutine from "./operations/return-from-subroutine";
import setAddresRegisterToFontSpriteVx from "./operations/set-address-register-to-font-sprite-vx";
import setAddressRegisterToNnn from "./operations/set-address-register-to-nnn";
import setDelayTimerToVx from "./operations/set-delay-timer-to-vx";
import setVxToDelayTimer from "./operations/set-vx-to-delay-timer";
import setVxToNn from "./operations/set-vx-to-nn";
import setVxToRandomNumberAndNn from "./operations/set-vx-to-random-number-and-nn";
import setVxToVxAndVy from "./operations/set-vx-to-vx-and-vy";
import skipNextIfKeyVxIsNotPressed from "./operations/skip-next-if-key-vx-is-not-pressed";
import storeVxAsDecimalInMemory from "./operations/store-vx-as-decimal-in-memory";
import type C8 from "./types/c8";
import skipNextIfVxNotEqualNn from "./operations/skip-next-if-vx-not-equal-nn";
import setVxToVy from "./operations/set-vx-to-vy";
import subtractVyFromVx from "./operations/subtract-vy-from-vx";
import setSoundTimerToVx from "./operations/set-sound-timer-to-vx";
import goToNextInstruction from "./go-to-next-instruction";
import skipNextIfVxEqualVy from "./operations/skip-next-if-vx-equal-vy";
import setVxToVxOrVy from "./operations/set-vx-to-vx-or-vy";
import setVxToVxXorVy from "./operations/set-vx-to-vx-xor-vy";
import rightShiftVx from "./operations/right-shift-vx";
import setVxToVyMinusVx from "./operations/set-vx-to-vy-minus-vx";
import leftShiftVx from "./operations/left-shft-vx";
import skipNextIfVxNotEqualVy from "./operations/skip-next-if-vx-not-equal-vy";
import jumpToV0PlusNnn from "./operations/jump-to-v0-plus-nnn";
import skipNextIfKeyVxIsPressed from "./operations/skip-next-if-key-vx-is-pressed";
import addVxToAddressRegister from "./operations/add-vx-to-address-register";
import storeV0ThroughVxInMemory from "./operations/store-v0-through-vx-in-memory";

export default function executeNextOperation(c8: C8) {
  const operationCode = concatenateBytes(
    c8.memory[c8.programCounter],
    c8.memory[c8.programCounter + 1]
  );
  goToNextInstruction(c8);
  return executeOperation(operationMap, c8, operationCode);
}

const executeOperation = (
  operationMap: OperationMap,
  c8: C8,
  operationCode: number
): void | 0 => {
  const query = operationCode & operationMap.selector;
  if (!(query in operationMap)) {
    throw new Error(
      `Could not process operation code: ${operationCode.toString(16)}`
    );
  }
  const target = operationMap[query];
  if ("selector" in target) {
    return executeOperation(target, c8, operationCode);
  } else {
    return target(c8, operationCode);
  }
};

const operationMap: OperationMap = {
  selector: 0xf000,
  0: { selector: 0xff, 0xee: returnFromSubroutine },
  0x1000: jumpToNnn,
  0x2000: callSubroutineAtNnn,
  0x3000: skipNextIfVxEqualsNn,
  0x4000: skipNextIfVxNotEqualNn,
  0x5000: skipNextIfVxEqualVy,
  0x6000: setVxToNn,
  0x7000: addNnToVx,
  0x8000: {
    selector: 0xf,
    0: setVxToVy,
    0x1: setVxToVxOrVy,
    0x2: setVxToVxAndVy,
    0x3: setVxToVxXorVy,
    0x4: addVyToVx,
    0x5: subtractVyFromVx,
    0x6: rightShiftVx,
    0x7: setVxToVyMinusVx,
    0xe: leftShiftVx,
  },
  0x9000: skipNextIfVxNotEqualVy,
  0xa000: setAddressRegisterToNnn,
  0xb000: jumpToV0PlusNnn,
  0xc000: setVxToRandomNumberAndNn,
  0xd000: drawSprite,
  0xe000: {
    selector: 0xff,
    0x9e: skipNextIfKeyVxIsPressed,
    0xa1: skipNextIfKeyVxIsNotPressed,
  },
  0xf000: {
    selector: 0xff,
    0x07: setVxToDelayTimer,
    0x15: setDelayTimerToVx,
    0x18: setSoundTimerToVx,
    0x1e: addVxToAddressRegister,
    0x29: setAddresRegisterToFontSpriteVx,
    0x33: storeVxAsDecimalInMemory,
    0x55: storeV0ThroughVxInMemory,
    0x65: loadMemoryIntoV0ThroughVx,
  },
};

type Operation = (c8: C8, operationCode: number) => void;

interface OperationMap {
  selector: number;
  [code: number]: OperationMap | Operation;
}
