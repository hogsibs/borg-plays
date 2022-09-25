import { memory } from "../../../memory/memory";
import { CPU } from "../../cpu";
import { getBitSubOperations } from "./bit-operations";
import { getResSubOperations } from "./res-operations";
import { getRotateShiftSubOperations } from "./rotate-shift-operations";
import { getSetSubOperations } from "./set-operations";

export function createCbSubOperations(this: CPU) {
  const cpu = this;
  this.addOperation({
    instruction: "",
    byteDefinition: 0xcb,
    cycleTime: 0,
    byteLength: 0,
    execute() {
      const cbOperationIndex = memory.readByte(
        cpu.registers.programCounter.value
      );
      cpu.registers.programCounter.value++;
      const subOperation = cpu.cbSubOperationMap.get(cbOperationIndex)!;
      subOperation.execute();
    },
  });

  getRotateShiftSubOperations(cpu);
  getBitSubOperations(cpu);
  getSetSubOperations(cpu);
  getResSubOperations(cpu);
}
