import { CPU } from "../../cpu.js";
import { getRotateShiftSubOperations } from "../cb-operations/rotate-shift-operations.js";
import { getBitSubOperations } from "../cb-operations/bit-operations.js";
import { getSetSubOperations } from "../cb-operations/set-operations.js";
import { getResSubOperations } from "../cb-operations/res-operations.js";
import { memory } from "../../../memory/memory.js";

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
