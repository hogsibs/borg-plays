import { CpuRegister } from "../internal-registers/cpu-register.js";

export class CpuFlagRegisterPair extends CpuRegister {
  get value() {
    return this.dataView.getUint16(this.offset, true);
  }

  set value(newValue: number) {
    const emptyFlagBitmask = 0b11_111_111_11_110_000;
    this.dataView.setUint16(this.offset, newValue & emptyFlagBitmask, true);
  }
}
