import { SingleByteMemoryRegister } from "../../memory/memory-register.js";
import { memory } from "../../memory/memory.js";

class InterruptEnableRegister implements SingleByteMemoryRegister {
  offset = 0xffff;
  name = "IE";

  get value() {
    return memory.readByte(this.offset);
  }

  set value(byte: number) {
    memory.writeByte(this.offset, byte);
  }
}

export const interruptEnableRegister = new InterruptEnableRegister();
