/*global chrome*/


const bufferToBase46 = (buffer) => {
  const bytes = new Uint8Array(buffer);

}


function captureAudio(tabId) {
  console.log('captureAudio invoked')
  chrome.tabCapture.capture( { audio: true }, (tabAudioStream) => {
    const length = 44100 * 6;
    const sampleRate = 44100;
    const buffer = new AudioBuffer( { length, sampleRate } );
    console.log('buffer')
    const stream = tabAudioStream;
    const audioBuffer = buffer.createBuffer(stream);

    console.log(audioBuffer);

  })
}


// TODO add tab capture function
// TODO add function which returns tabIDs for with audio playing

module.exports = captureAudio;