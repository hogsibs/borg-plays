import { fontHeight } from "../constants.js";
import C8 from "../types/c8.js";
import { getX } from "./common.js";

export default function setAddresRegisterToFontSpriteVx(c8: C8, code: number) {
  c8.addressRegister = c8.registers[getX(code)] * fontHeight;
}
