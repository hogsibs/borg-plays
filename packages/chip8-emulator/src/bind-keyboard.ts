import C8 from "./types/c8";

export default function bindKeyboard(c8: C8) {
  const keyDownListener = ({ key }: KeyboardEvent) => {
    c8.keyPad |= getKeyWord(key);
  };
  addEventListener("keydown", keyDownListener);

  const keyUpListener = ({ key }: KeyboardEvent) => {
    c8.keyPad &= ~getKeyWord(key);
  };
  addEventListener("keyup", keyUpListener);

  return () => {
    removeEventListener("keydown", keyDownListener);
    removeEventListener("keyup", keyUpListener);
  };
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
