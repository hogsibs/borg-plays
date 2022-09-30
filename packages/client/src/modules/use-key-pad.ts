import { useEffect, useRef, useState } from "react";

const useKeyPad = () => {
  const keyPadRef = useRef(0);
  const [keyPad, setKeyPad] = useState(0);
  useEffect(() => {
    const keyDownListener = ({ key }: KeyboardEvent) => {
      keyPadRef.current |= getKeyWord(key);
      setKeyPad(keyPadRef.current);
    };
    addEventListener("keydown", keyDownListener);

    const keyUpListener = ({ key }: KeyboardEvent) => {
      keyPadRef.current &= ~getKeyWord(key);
      setKeyPad(keyPadRef.current);
    };
    addEventListener("keyup", keyUpListener);

    return () => {
      removeEventListener("keydown", keyDownListener);
      removeEventListener("keyup", keyUpListener);
    };
  }, []);

  return keyPad;
};
export default useKeyPad;

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
