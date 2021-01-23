import * as chrome from 'regenerator-runtime/runtime';
import { defaultOptions, identify_v2 } from '../Arc-api/audio-request';

let recorder: MediaRecorder;
let streamObject: MediaStream;

const error: {noAudibleTab: string;} = {
  noAudibleTab: 'Please select an audible tab',
}

function handleCapture (stream: MediaStream, muteTab) {
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
      const data = uploadStream(blob);
      resolve(data);
    }
  })
}

function uploadStream (stream) {
  return new Promise(resolve => {
    toBuffer(stream);
    identify_v2(stream, defaultOptions, function (body, httpResponse, err) {
        if (err) console.log();
        console.log('test body', body);
        resolve(body);
    })
  })
}

function toBuffer (stream) {
  let buffer = Buffer.alloc(stream.size);
  let view = new Uint8Array(stream);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

export const captureTab = (tabId) => {
//~if there is no given tabId as an argument, check if active tab is audible
  // if (!tabId) {
  //   chrome.tabs.query({ active: true, audible: false }, tabs => {
  //     if (tabs.length) {
  //       return error.noAudibleTab
  //     } else {
  //     tabId = tabs.id
  //     }
  //   })
  // }
  //todo! -- add getId argument into function below
  return new Promise(resolve => {
    chrome.tabCapture.capture({ audio: true }, function(stream) {
      let audio = new Audio();
      audio.srcObject = stream;
      audio.play();
      const data = handleCapture(stream, undefined);
      console.log('data', data);
      resolve(data);
    })
  })
}







  //! Unused functions below
  // let currentTabId;

  // function checkActiveTab(capturedTabs) {
  //     if (capturedTabs.some(tab => tab.tabId === currentTabId && tab.status === 'active')) {
  //       console.log('tab being captured')
  //     }

  //     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  //       currentTabId = tabs[0].id
  //     })
  //   }

  // function listAllTabs () {
  //   chrome.tabs.query({}, function(tabs) {
  //     console.log('tabs', tabs);
  //   });
  // };
  // TODO add function which returns tabIDs for  audio playing
