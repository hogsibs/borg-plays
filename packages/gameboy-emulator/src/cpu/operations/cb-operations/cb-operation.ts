import { CPU } from "../../cpu";
import { getRotateShiftSubOperations } from "../cb-operations/rotate-shift-operations";
import { getBitSubOperations } from "../cb-operations/bit-operations";
import { getSetSubOperations } from "../cb-operations/set-operations";
import { getResSubOperations } from "../cb-operations/res-operations";
import { memory } from "../../../memory/memory";

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
