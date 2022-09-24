import { RemoteAudioWorklet } from "./RemoteAudioWorklet.js";
import { RemoteAudioNode } from "./ring-buffer/RemoteAudioNode.js";
import { RemoteAudioParam } from "./ring-buffer/RemoteAudioParam.js";

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
