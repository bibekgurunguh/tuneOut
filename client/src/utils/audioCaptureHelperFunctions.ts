import {
  defaultApiOptions,
  requestSongInfoUsingBlob,
} from '../utils/apiRequestFunctions';

let recorder: MediaRecorder;
let streamObject: MediaStream;

export const recordAudioStream = (stream: MediaStream | null) => {
  if (!stream) return;
  return new Promise((resolve) => {
    const options: { mimeType: string } = {
      mimeType: 'audio/webm; codecs=opus',
    };
    recorder = new MediaRecorder(stream, options);
    streamObject = stream;
    recorder.start();
    setTimeout(() => {
      recorder.stop();
      streamObject.getAudioTracks()[0].stop();
    }, 8000);
    recorder.ondataavailable = function (e) {
      let blob = new Blob([e.data], { type: 'audio/mp3' });
      const data = triggerApiCall(blob);
      resolve(data);
    };
  });
};

export const triggerApiCall = (stream: Blob) => {
  console.log('stream in triggerApI', stream);
  return new Promise((resolve) => {
    requestSongInfoUsingBlob(
      stream,
      defaultApiOptions,
      function (body: {}, httpResponse: null, err: Error) {
        if (err) console.error('Error: ', err);
        resolve(body);
      },
    );
  });
};

export const duplicateAudioStream = (stream: MediaStream) => {
  const duplicateAudio = new Audio();
  duplicateAudio.srcObject = stream;
  return duplicateAudio;
};
