export const getX = (code: number) => (code >> 8) & 0xf;
export const getNnn = (code: number) => code & 0xfff;
export const getY = (code: number) => (code >> 4) & 0xf;
export const getNn = (code: number) => code & 0xff;
export const getN = (code: number) => code & 0xf;
