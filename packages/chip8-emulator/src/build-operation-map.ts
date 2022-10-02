import { Operations } from "./operations/index.js";

export default (operations: Operations) => ({
  selector: 0xf000,
  0: {
    selector: 0xff,
    0xe0: operations.clearScreen,
    0xee: operations.returnFromSubroutine,
  },
  0x1000: operations.jumpToNnn,
  0x2000: operations.callSubroutineAtNnn,
  0x3000: operations.skipNextIfVxEqualsNn,
  0x4000: operations.skipNextIfVxNotEqualNn,
  0x5000: operations.skipNextIfVxEqualVy,
  0x6000: operations.setVxToNn,
  0x7000: operations.addNnToVx,
  0x8000: {
    selector: 0xf,
    0: operations.setVxToVy,
    0x1: operations.setVxToVxOrVy,
    0x2: operations.setVxToVxAndVy,
    0x3: operations.setVxToVxXorVy,
    0x4: operations.addVyToVx,
    0x5: operations.subtractVyFromVx,
    0x6: operations.rightShiftVx,
    0x7: operations.setVxToVyMinusVx,
    0xe: operations.leftShiftVx,
  },
  0x9000: operations.skipNextIfVxNotEqualVy,
  0xa000: operations.setAddressRegisterToNnn,
  0xb000: operations.jumpToV0PlusNnn,
  0xc000: operations.setVxToRandomNumberAndNn,
  0xd000: operations.drawSprite,
  0xe000: {
    selector: 0xff,
    0x9e: operations.skipNextIfKeyVxIsPressed,
    0xa1: operations.skipNextIfKeyVxIsNotPressed,
  },
  0xf000: {
    selector: 0xff,
    0x07: operations.setVxToDelayTimer,
    0x0a: operations.waitForAnyKey,
    0x15: operations.setDelayTimerToVx,
    0x18: operations.setSoundTimerToVx,
    0x1e: operations.addVxToAddressRegister,
    0x29: operations.setAddresRegisterToFontSpriteVx,
    0x33: operations.storeVxAsDecimalInMemory,
    0x55: operations.storeV0ThroughVxInMemory,
    0x65: operations.loadMemoryIntoV0ThroughVx,
  },
});
