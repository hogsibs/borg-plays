import addNnToVx from "./add-nn-to-vx.js";
import addVxToAddressRegister from "./add-vx-to-address-register.js";
import addVyToVx from "./add-vy-to-vx.js";
import callSubroutineAtNnn from "./call-subroutine-at-nnn.js";
import drawSprite from "./draw-sprite.js";
import jumpToNnn from "./jump-to-nnn.js";
import jumpToV0PlusNnn from "./jump-to-v0-plus-nnn.js";
import leftShiftVx from "./left-shft-vx.js";
import loadMemoryIntoV0ThroughVx from "./load-memory-into-v0-through-vx.js";
import returnFromSubroutine from "./return-from-subroutine.js";
import rightShiftVx from "./right-shift-vx.js";
import setAddresRegisterToFontSpriteVx from "./set-address-register-to-font-sprite-vx.js";
import setAddressRegisterToNnn from "./set-address-register-to-nnn.js";
import setDelayTimerToVx from "./set-delay-timer-to-vx.js";
import setSoundTimerToVx from "./set-sound-timer-to-vx.js";
import setVxToDelayTimer from "./set-vx-to-delay-timer.js";
import setVxToNn from "./set-vx-to-nn.js";
import setVxToRandomNumberAndNn from "./set-vx-to-random-number-and-nn.js";
import setVxToVxAndVy from "./set-vx-to-vx-and-vy.js";
import setVxToVxOrVy from "./set-vx-to-vx-or-vy.js";
import setVxToVxXorVy from "./set-vx-to-vx-xor-vy.js";
import setVxToVy from "./set-vx-to-vy.js";
import setVxToVyMinusVx from "./set-vx-to-vy-minus-vx.js";
import skipNextIfKeyVxIsNotPressed from "./skip-next-if-key-vx-is-not-pressed.js";
import skipNextIfKeyVxIsPressed from "./skip-next-if-key-vx-is-pressed.js";
import skipNextIfVxEqualVy from "./skip-next-if-vx-equal-vy.js";
import skipNextIfVxEqualsNn from "./skip-next-if-vx-equals-nn.js";
import skipNextIfVxNotEqualNn from "./skip-next-if-vx-not-equal-nn.js";
import skipNextIfVxNotEqualVy from "./skip-next-if-vx-not-equal-vy.js";
import storeV0ThroughVxInMemory from "./store-v0-through-vx-in-memory.js";
import storeVxAsDecimalInMemory from "./store-vx-as-decimal-in-memory.js";
import subtractVyFromVx from "./subtract-vy-from-vx.js";
import clearScreen from "./clear-screen.js";
import waitForAnyKey from "./wait-for-any-key.js";

const operations = {
  addNnToVx,
  addVxToAddressRegister,
  addVyToVx,
  callSubroutineAtNnn,
  clearScreen,
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
  waitForAnyKey,
};
export default operations;

export type Operations = typeof operations;
