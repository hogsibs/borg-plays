import { C8 } from "chip8-emulator";
import { useCallback, useEffect, useRef } from "react";

const useKeyPad = (c8: C8 | undefined) => {
  const keyPadRef = useRef(0);
  const emitKeyPad = useCallback(() => {
    if (c8) {
      c8.keyPad = keyPadRef.current;
    }
  }, [c8]);
  useEffect(() => {
    const keyDownListener = ({ key }: KeyboardEvent) => {
      if (key in keyMap) {
        keyPadRef.current |= getKeyWord(key);
        emitKeyPad();
      }
    };
    addEventListener("keydown", keyDownListener);

    const keyUpListener = ({ key }: KeyboardEvent) => {
      if (key in keyMap) {
        keyPadRef.current &= ~getKeyWord(key);
        emitKeyPad();
      }
    };
    addEventListener("keyup", keyUpListener);

    return () => {
      removeEventListener("keydown", keyDownListener);
      removeEventListener("keyup", keyUpListener);
    };
  }, [emitKeyPad]);
};
export default useKeyPad;

function getKeyWord(key: string) {
  return 1 << keyMap[key];
}

const keyMap: KeyMap = {
  "1": 0x1,
  "2": 0x2,
  "3": 0x3,
  "4": 0xc,
  q: 0x4,
  w: 0x5,
  e: 0x6,
  a: 0x7,
  s: 0x8,
  d: 0x9,
  x: 0x0,
  z: 0xa,
  c: 0xb,
  r: 0xd,
  f: 0xe,
  v: 0xf,
};

interface KeyMap {
  [key: string]: number;
}
