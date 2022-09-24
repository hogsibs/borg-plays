import { memory } from "../../memory/memory.js";
import { SingleByteMemoryRegister } from "../../memory/memory-register.js";

export class Sound3LengthRegister implements SingleByteMemoryRegister {
  offset = 0xff1b;
  name = "NR31";

  get value() {
    return memory.readByte(this.offset);
  }
}

export const sound3LengthRegister = new Sound3LengthRegister();
