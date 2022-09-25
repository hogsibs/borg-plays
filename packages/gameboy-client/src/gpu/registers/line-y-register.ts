import { memory } from "../../memory/memory";
import { SingleByteMemoryRegister } from "../../memory/memory-register";

export class LineYRegister implements SingleByteMemoryRegister {
  offset = 0xff44;
  name = "LY";

  get value() {
    return memory.readByte(this.offset);
  }

  set value(byte: number) {
    memory.writeByte(this.offset, byte);
  }
}

export const lineYRegister = new LineYRegister();
