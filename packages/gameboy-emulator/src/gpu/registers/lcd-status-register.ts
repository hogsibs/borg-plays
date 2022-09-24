import { SingleByteMemoryRegister } from "../../memory/memory-register.js";
import { memory } from "../../memory/memory.js";
import { getBit, setBit } from "../../helpers/binary-helpers.js";
import { LcdStatusMode } from "./lcd-status-mode.enum.js";

class LcdStatusRegister implements SingleByteMemoryRegister {
  offset = 0xff41;
  name = "STAT";

  get value() {
    return memory.readByte(this.offset);
  }

  set value(byte: number) {
    memory.writeByte(this.offset, byte);
  }

  get mode(): LcdStatusMode {
    return this.value & 0b11;
  }

  set mode(newMode: LcdStatusMode) {
    let stat = this.value;
    stat = setBit(stat, 0, newMode & 0b1);
    stat = setBit(stat, 1, (newMode >> 1) & 0b1);
    this.value = stat;
  }

  get isLineYCompareMatching() {
    return getBit(this.value, 2) === 1;
  }
  set isLineYCompareMatching(isMatching) {
    this.value = setBit(this.value, 2, isMatching ? 1 : 0);
  }

  get isHBlankInterruptSelected() {
    return getBit(this.value, 3);
  }

  get isLineYMatchingInterruptSelected() {
    return getBit(this.value, 6);
  }
}

export const lcdStatusRegister = new LcdStatusRegister();
