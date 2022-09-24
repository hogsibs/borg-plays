import { SingleByteMemoryRegister } from "../../memory/memory-register.js";
import { memory } from "../../memory/memory.js";

export class TimerCounterRegister implements SingleByteMemoryRegister {
  offset = 0xff05;
  name = "TIMA";

  get value() {
    return memory.readByte(this.offset);
  }

  set value(byte: number) {
    memory.writeByte(this.offset, byte);
  }
}

export const timerCounterRegister = new TimerCounterRegister();
