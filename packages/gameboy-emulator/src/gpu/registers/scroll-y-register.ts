import { SingleByteMemoryRegister } from "../../memory/memory-register.js";
import { memory } from "../../memory/memory.js";

export class ScrollYRegister implements SingleByteMemoryRegister {
  offset = 0xff42;
  name = "SCY";

  get value() {
    return memory.readByte(this.offset);
  }

  set value(byte: number) {
    memory.writeByte(this.offset, byte);
  }
}

export const scrollYRegister = new ScrollYRegister();
