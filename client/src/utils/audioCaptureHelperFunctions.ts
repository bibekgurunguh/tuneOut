import {
  defaultApiOptions,
  requestSongInfoUsingBlob,
} from '../utils/apiRequestFunctions';

let recorder: MediaRecorder;
let streamObject: MediaStream;

export const getSearchTime = () => {
  let fetchedSearchTime: number = 6000;
  chrome.storage.local.get(['searchTime'], (result) => {
    if (chrome.runtime.lastError) {
      fetchedSearchTime = 6000;
    } else {
      console.log('Value currently is ' + result.searchTime);
      fetchedSearchTime = result.searchTime;
    }
  });
  return fetchedSearchTime;
}

// chrome.storage.local.get(['searchTime'], (result) => {
//     console.log('Value currently is ' + result.searchTime);
//     searchTime = result.searchTime;
// });

export const recordAudioStream = (stream: MediaStream | undefined, searchTime: number) => {
  if (!stream) throw new Error('Stream is undefined.');
  return new Promise<string>((resolve) => {
    const options: { mimeType: string } = {
      mimeType: 'audio/webm; codecs=opus',
    };
    recorder = new MediaRecorder(stream, options);
    streamObject = stream;
    recorder.start();
    setTimeout(() => {
      recorder.stop();
      streamObject.getAudioTracks()[0].stop();
    }, searchTime);
    recorder.ondataavailable = function (e) {
      let blob = new Blob([e.data], { type: 'audio/mp3' });
      const data = triggerApiCall(blob);
      resolve(data);
    };
  });
};

export const triggerApiCall = (stream: Blob) => {
  console.log('stream in triggerApI', stream);
  return new Promise<string>((resolve) => {
    requestSongInfoUsingBlob(
      stream,
      defaultApiOptions,
      function (body: string, httpResponse: null, err: Error) {
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
