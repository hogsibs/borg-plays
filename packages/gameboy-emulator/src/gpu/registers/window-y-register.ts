import { SingleByteMemoryRegister } from "../../memory/memory-register.js";
import { memory } from "../../memory/memory.js";

export class WindowYRegister implements SingleByteMemoryRegister {
  offset = 0xff4a;
  name = "WY";

  get value() {
    return memory.readByte(this.offset);
  }

  set value(byte: number) {
    memory.writeByte(this.offset, byte);
  }
}

export const windowYRegister = new WindowYRegister();
