import addNnToVx from "./add-nn-to-vx";
import addVxToAddressRegister from "./add-vx-to-address-register";
import addVyToVx from "./add-vy-to-vx";
import callSubroutineAtNnn from "./call-subroutine-at-nnn";
import drawSprite from "./draw-sprite";
import jumpToNnn from "./jump-to-nnn";
import jumpToV0PlusNnn from "./jump-to-v0-plus-nnn";
import leftShiftVx from "./left-shft-vx";
import loadMemoryIntoV0ThroughVx from "./load-memory-into-v0-through-vx";
import returnFromSubroutine from "./return-from-subroutine";
import rightShiftVx from "./right-shift-vx";
import setAddresRegisterToFontSpriteVx from "./set-address-register-to-font-sprite-vx";
import setAddressRegisterToNnn from "./set-address-register-to-nnn";
import setDelayTimerToVx from "./set-delay-timer-to-vx";
import setSoundTimerToVx from "./set-sound-timer-to-vx";
import setVxToDelayTimer from "./set-vx-to-delay-timer";
import setVxToNn from "./set-vx-to-nn";
import setVxToRandomNumberAndNn from "./set-vx-to-random-number-and-nn";
import setVxToVxAndVy from "./set-vx-to-vx-and-vy";
import setVxToVxOrVy from "./set-vx-to-vx-or-vy";
import setVxToVxXorVy from "./set-vx-to-vx-xor-vy";
import setVxToVy from "./set-vx-to-vy";
import setVxToVyMinusVx from "./set-vx-to-vy-minus-vx";
import skipNextIfKeyVxIsNotPressed from "./skip-next-if-key-vx-is-not-pressed";
import skipNextIfKeyVxIsPressed from "./skip-next-if-key-vx-is-pressed";
import skipNextIfVxEqualVy from "./skip-next-if-vx-equal-vy";
import skipNextIfVxEqualsNn from "./skip-next-if-vx-equals-nn";
import skipNextIfVxNotEqualNn from "./skip-next-if-vx-not-equal-nn";
import skipNextIfVxNotEqualVy from "./skip-next-if-vx-not-equal-vy";
import storeV0ThroughVxInMemory from "./store-v0-through-vx-in-memory";
import storeVxAsDecimalInMemory from "./store-vx-as-decimal-in-memory";
import subtractVyFromVx from "./subtract-vy-from-vx";

const operations = {
  addNnToVx,
  addVxToAddressRegister,
  addVyToVx,
  callSubroutineAtNnn,
  drawSprite,
  jumpToNnn,
  jumpToV0PlusNnn,
  leftShiftVx,
  loadMemoryIntoV0ThroughVx,
  returnFromSubroutine,
  rightShiftVx,
  setAddresRegisterToFontSpriteVx,
  setAddressRegisterToNnn,
  setDelayTimerToVx,
  setSoundTimerToVx,
  setVxToDelayTimer,
  setVxToNn,
  setVxToRandomNumberAndNn,
  setVxToVxAndVy,
  setVxToVxOrVy,
  setVxToVxXorVy,
  setVxToVyMinusVx,
  setVxToVy,
  skipNextIfKeyVxIsNotPressed,
  skipNextIfKeyVxIsPressed,
  skipNextIfVxEqualVy,
  skipNextIfVxEqualsNn,
  skipNextIfVxNotEqualNn,
  skipNextIfVxNotEqualVy,
  storeV0ThroughVxInMemory,
  storeVxAsDecimalInMemory,
  subtractVyFromVx,
};
export default operations;

export type Operations = typeof operations;
