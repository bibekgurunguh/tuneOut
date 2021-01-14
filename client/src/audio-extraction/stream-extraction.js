const context = new AudioContext();

const buffer = context.createBufferSource();

let audioBuffer;

const bufferToBase46 = (buffer) => {
  const bytes = new Uint8Array(buffer);

}