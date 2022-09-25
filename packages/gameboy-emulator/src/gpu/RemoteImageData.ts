export class RemoteImageData {
  data: Uint8ClampedArray;

  constructor(public width: number, public height: number) {
    this.data = new Uint8ClampedArray(width * height * 4);
  }
}
