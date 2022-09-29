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

export default function executeNextOperation(c8: C8) {
  const operationCode = concatenateBytes(
    c8.memory[c8.programCounter],
    c8.memory[c8.programCounter + 1]
  );
  c8.programCounter += 2;
  executeOperation(operationMap, c8, operationCode);
}

const executeOperation = (
  operationMap: OperationMap,
  c8: C8,
  operationCode: number
) => {
  const query = operationCode & operationMap.selector;
  if (!(query in operationMap)) {
    throw new Error(
      `Could not process operation code: ${operationCode.toString(16)}`
    );
  }
  const target = operationMap[query];
  if ("selector" in target) {
    executeOperation(target, c8, operationCode);
  } else {
    target(c8, operationCode);
  }
};

const operationMap: OperationMap = {
  selector: 0xf000,
  0: { selector: 0xff, 0xee: returnFromSubroutine },
  0x1000: jumpToNnn,
  0x2000: callSubroutineAtNnn,
  0x3000: skipNextIfVxEqualsNn,
  0x4000: skipNextIfVxNotEqualNn,
  0x6000: setVxToNn,
  0x7000: addNnToVx,
  0x8000: {
    selector: 0xf,
    0: setVxToVy,
    0x2: setVxToVxAndVy,
    0x4: addVyToVx,
    0x5: subtractVyFromVx,
  },
  0xa000: setAddressRegisterToNnn,
  0xc000: setVxToRandomNumberAndNn,
  0xd000: drawSprite,
  0xe000: { selector: 0xff, 0xa1: skipNextIfKeyVxIsNotPressed },
  0xf000: {
    selector: 0xff,
    0x07: setVxToDelayTimer,
    0x15: setDelayTimerToVx,
    0x18: setSoundTimerToVx,
    0x29: setAddresRegisterToFontSpriteVx,
    0x33: storeVxAsDecimalInMemory,
    0x65: loadMemoryIntoV0ThroughVx,
  },
};

type Operation = (c8: C8, operationCode: number) => void;

interface OperationMap {
  selector: number;
  [code: number]: OperationMap | Operation;
}
