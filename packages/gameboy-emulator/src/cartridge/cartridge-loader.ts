import { CartridgeType } from "./cartridge-type.enum.js";
import { Mbc1Cartridge } from "./mbc1-cartridge.js";
import { Cartridge } from "./cartridge.js";
import { Mbc3Cartridge } from "./mbc3-cartridge.js";

export class CartridgeLoader {
  static TypeOffset = 0x147;

  static FromArrayBuffer(
    gameData: ArrayBuffer
  ): Cartridge | Mbc1Cartridge | Mbc3Cartridge {
    const gameDataView = new DataView(gameData);
    const type = gameDataView.getUint8(
      CartridgeLoader.TypeOffset
    ) as CartridgeType;

    switch (type) {
      case CartridgeType.ROM:
        return new Cartridge(gameDataView);
      case CartridgeType.MBC1:
      case CartridgeType.MBC1_RAM:
      case CartridgeType.MBC1_RAM_BATTERY:
        return new Mbc1Cartridge(gameDataView);
      case CartridgeType.MBC3:
      case CartridgeType.MBC3_RAM:
      case CartridgeType.MBC3_RAM_BATTERY:
      case CartridgeType.MBC3_TIMER_BATTERY:
      case CartridgeType.MBC3_TIMER_RAM_BATTERY:
        return new Mbc3Cartridge(gameDataView);
      default:
        console.error("oops not ready");
        return new Cartridge(gameDataView);
    }
  }
}
