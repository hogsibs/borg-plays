import { useCallback, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

const validKeys = {
  "1": undefined,
  q: undefined,
  a: undefined,
  "3": undefined,
  e: undefined,
  d: undefined,
};

const useKeyPad = (socket: Socket | undefined) => {
  const keyPadRef = useRef<KeyPad>({});
  const keyPad = keyPadRef.current;
  const emitKeyPad = useCallback(() => {
    if (socket) {
      socket.emit("keyPad", keyPad);
    }
  }, [socket]);
  useEffect(() => {
    const keyDownListener = ({ key }: KeyboardEvent) => {
      if (key in validKeys && !keyPad[key]) {
        keyPad[key] = true;
        emitKeyPad();
      }
    };
    addEventListener("keydown", keyDownListener);

    const keyUpListener = ({ key }: KeyboardEvent) => {
      if (key in validKeys && keyPad[key]) {
        keyPad[key] = false;
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

interface KeyPad {
  [key: string]: boolean;
}

function getKeyWord(key: string) {
  return 1 << keyMap[key as keyof typeof keyMap];
}

const keyMap = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 12,
  q: 3,
  w: 4,
  e: 5,
  a: 6,
  s: 7,
  d: 8,
  x: 9,
  z: 10,
  c: 11,
  r: 13,
  f: 14,
  v: 15,
};
