export function copy(from: Uint8Array, to: Uint8Array, target = 0) {
  from.forEach((value, index) => (to[index + target] = value));
}
