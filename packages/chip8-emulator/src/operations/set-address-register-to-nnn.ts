import type C8 from "../types/c8";
import { getNnn } from "./common";

export default function setAddressRegisterToNnn(c8: C8, code: number) {
  c8.addressRegister = getNnn(code);
}
