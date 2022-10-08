import { useCanvas2dContext } from "./canvas-2d";
import { Rom } from "chip8-emulator";
import {
  initializeChip8,
  stepper,
  defaultOperations as chip8Operations,
} from "chip8-emulator-2";
import { drawScreen } from "./draw-screen";
import { FunctionComponent, useEffect, useMemo } from "react";
import { useAudioContext } from "./audio-context";
import beep from "./beep";

const EmulatorController: FunctionComponent<{ rom: Rom }> = ({ rom }) => {
  const canvasContext = useCanvas2dContext();
  const audioContext = useAudioContext();
  const chip8 = useMemo(
    () =>
      initializeChip8(Uint8Array.from(atob(rom.data), (c) => c.charCodeAt(0))),
    [rom]
  );
  const step = useMemo(
    () =>
      stepper({
        ...chip8Operations,
        drawSprite: (chip8, x, y, n) => {
          chip8Operations.drawSprite(chip8, x, y, n);
          drawScreen(canvasContext, chip8.display);
        },
        playSound: audioContext
          ? (chip8, x) => {
              beep(audioContext, chip8.registers[x] / 60);
            }
          : () => {},
      }),
    [canvasContext, audioContext]
  );

  useEffect(() => {
    const stepperMs = 1000 / 500;
    const delayTimerMs = 1000 / 60;
    let lastStep: number, lastDelay: number;
    lastStep = lastDelay = performance.now();
    const interval = setInterval(() => {
      while (lastStep < performance.now()) {
        step(chip8);
        lastStep += stepperMs;
        if (lastDelay < lastStep) {
          if (chip8.delayTimer > 0) {
            --chip8.delayTimer;
          }
          lastDelay += delayTimerMs;
        }
      }
    });
    return () => clearInterval(interval);
  }, [chip8, step]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code in keyMap) {
        chip8.keys |= keyMap[e.code];
      }
    };
    addEventListener("keydown", handleKeyDown);

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code in keyMap) {
        chip8.keys &= ~keyMap[e.code];
      }
    };
    addEventListener("keyup", handleKeyUp);
    return () => {
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
    };
  }, [chip8]);

  return null;
};

const keyMap: Record<string, number> = {
  Digit1: 0b0000000000000001,
  Digit2: 0b0000000000000010,
  Digit3: 0b0000000000000100,
  Digit4: 0b0000000000001000,
  KeyQ: 0b0000000000010000,
  KeyW: 0b0000000000100000,
  KeyE: 0b0000000001000000,
  KeyR: 0b0000000010000000,
  KeyA: 0b0000000100000000,
  KeyS: 0b0000001000000000,
  KeyD: 0b0000010000000000,
  KeyF: 0b0000100000000000,
  KeyZ: 0b0001000000000000,
  KeyX: 0b0010000000000000,
  KeyC: 0b0100000000000000,
  KeyV: 0b1000000000000000,
};

export default EmulatorController;
