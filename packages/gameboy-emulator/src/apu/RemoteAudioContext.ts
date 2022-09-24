import { RemoteAudioWorklet } from "./RemoteAudioWorklet";
import { RemoteAudioNode } from "./ring-buffer/RemoteAudioNode";
import { RemoteAudioParam } from "./ring-buffer/RemoteAudioParam";

export class RemoteAudioContext {
  public sampleRate: number;
  public audioWorklet: RemoteAudioWorklet = new RemoteAudioWorklet();
  public destination: RemoteAudioNode = new RemoteAudioNode();

  constructor({ sampleRate }: { sampleRate: number }) {
    this.sampleRate = sampleRate;
  }

  resume() {}
  suspend() {}
}
