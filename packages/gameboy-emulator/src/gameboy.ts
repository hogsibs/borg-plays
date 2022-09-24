import { GPU } from "./gpu/gpu.js";
import { CPU } from "./cpu/cpu.js";
import { memory } from "./memory/memory.js";
import { input } from "./input/input.js";
import { APU } from "./apu/apu.js";
import { lcdControlRegister } from "./gpu/registers/lcd-control-register.js";
import { controllerManager } from "./input/controller-manager.js";
import { CartridgeType } from "./cartridge/cartridge-type.enum.js";
import { Mbc1Cartridge } from "./cartridge/mbc1-cartridge.js";
import { CartridgeLoader } from "./cartridge/cartridge-loader.js";
import { keyboardManager } from "./input/keyboard-manager.js";

export class Gameboy {
  cpu = new CPU();
  gpu = new GPU();
  apu = new APU();

  memory = memory;

  private frameFinishedCallback?: Function;
  fps = 0;
  input = input;
  controllerManager = controllerManager;
  keyboardManager = keyboardManager;

  private maxFps = 60;
  private interval = 1000 / this.maxFps;

  private cycles = 0;

  private previousTime = 0;

  run() {
    this.cpu.initialize();
    memory.reset();
    lcdControlRegister.value = 0x83; // initial value from official guide

    setTimeout((diff) => this.runFrame(diff));
  }

  private runFrame(currentTime: number) {
    const delta = currentTime - this.previousTime;

    if (delta >= this.interval || !this.previousTime) {
      this.fps = 1000 / (currentTime - this.previousTime);

      this.previousTime = currentTime - (delta % this.interval);

      while (this.cycles <= GPU.CyclesPerFrame) {
        const cycleForTick = this.cpu.tick();
        this.gpu.tick(cycleForTick);
        this.apu.tick(cycleForTick);
        this.cycles += cycleForTick;
      }

      controllerManager.queryButtons();

      if (this.frameFinishedCallback) {
        this.frameFinishedCallback(
          this.gpu.screen,
          this.fps,
          this.cpu.registers
        );
      }

      this.cycles = this.cycles % GPU.CyclesPerFrame;
    }

    setTimeout((diff) => this.runFrame(diff));
  }

  onFrameFinished(callback: Function) {
    this.frameFinishedCallback = callback;
  }

  loadGame(arrayBuffer: ArrayBuffer) {
    const cartridge = CartridgeLoader.FromArrayBuffer(arrayBuffer);
    memory.insertCartridge(cartridge);
    console.log("title: " + cartridge.title);
    console.log("version: " + cartridge.versionNumber);
    console.log("type: " + cartridge.typeName);
    console.log("rom size: " + cartridge.romSize);
    console.log("ram size: " + cartridge.ramSize);
  }

  setCartridgeSaveRam(sramArrayBuffer: ArrayBuffer) {
    if (
      memory.cartridge?.type === CartridgeType.MBC1_RAM_BATTERY ||
      CartridgeType.MBC3_RAM_BATTERY
    ) {
      const cartridge = memory.cartridge as Mbc1Cartridge;
      cartridge.setRam(sramArrayBuffer);
    }
  }

  getCartridgeSaveRam() {
    if (
      memory.cartridge?.type === CartridgeType.MBC1_RAM_BATTERY ||
      CartridgeType.MBC3_RAM_BATTERY
    ) {
      const cartridge = memory.cartridge as Mbc1Cartridge;
      return cartridge.dumpRam();
    }
  }

  setOnWriteToCartridgeRam(onSramWrite: Function) {
    if (
      memory.cartridge?.type === CartridgeType.MBC1_RAM_BATTERY ||
      CartridgeType.MBC3_RAM_BATTERY
    ) {
      const cartridge = memory.cartridge as Mbc1Cartridge;
      cartridge.onSramWrite = onSramWrite;
    }
  }

  get cartridge() {
    return memory.cartridge;
  }
}
