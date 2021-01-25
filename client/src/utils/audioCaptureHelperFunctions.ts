import { defaultOptions, identify_v2 } from '../utils/apiRequestFunctions';

let recorder: MediaRecorder;
let streamObject: MediaStream;

export function handleCapture (stream, muteTab) {
  return new Promise(resolve => {
    const options:{mimeType: string} = { mimeType: 'audio/webm; codecs=opus' };
    recorder = new MediaRecorder(stream, options);
    streamObject = stream;
    recorder.start();
    setTimeout(() => {
      recorder.stop();
      streamObject.getAudioTracks()[0].stop();
    }, 8000);
    recorder.ondataavailable = function(e) {
      let blob = new Blob([e.data], { type: 'audio/mp3' });
      const data = triggerApiCall(blob);
      resolve(data);
    }
  })
}

export function triggerApiCall (stream) {
  return new Promise(resolve => {
    // toBuffer(stream);
    identify_v2(stream, defaultOptions, function (body, httpResponse, err) {
        if (err) console.error('Error: ', err);
        resolve(body);
    })
  })
}

export const duplicateAudioStream = (stream) => {
  const duplicateAudio = new Audio();
  duplicateAudio.srcObject = stream;
  return duplicateAudio;
}