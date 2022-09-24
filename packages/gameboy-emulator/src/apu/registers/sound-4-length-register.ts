import { memory } from "../../memory/memory.js";
import { SingleByteMemoryRegister } from "../../memory/memory-register.js";

export class Sound4LengthRegister implements SingleByteMemoryRegister {
  offset = 0xff20;
  name = "NR41";

  get value() {
    return memory.readByte(this.offset);
  }

  get soundLength() {
    return this.value & 0b111111;
  }
}

export const sound4LengthRegister = new Sound4LengthRegister();
