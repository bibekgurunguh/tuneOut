/*global chrome*/

// TODO add tab capture function
// TODO audio recorder function

import { defaultOptions, identify_v2 } from '../utils/apiRequestFunctions.js';

window.srcObject;

let recorder;

// let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function handleCapture(stream) {
  const options = { mimeType: 'audio/webm; codecs=opus' };
  recorder = new MediaRecorder(stream, options);
  recorder.start();
  console.log('recorder started');
  setTimeout(() => {
    let chunks = [];
    recorder.ondataavailable = function (e) {
      let blob = new Blob([e.data], { type: 'audio/mp3' });
      uploadStream(blob);
    };
    // let audio = new Audio();
    // audio.scrObject = blob
    // audio.play()
    // audio.stop()
    recorder.stop();
    console.log('recorder stopped');

    console.log('tabcapture stopped');

    return;
  }, 6000);
}

function uploadStream(stream) {
  console.log('typeofstream', stream);
  toBuffer(stream);
  console.log('stream', stream);
  identify_v2(stream, defaultOptions, function (err, httpResponse, body) {
    if (err) console.log(err);
    console.log(body);
  });
}

function toBuffer(stream) {
  let buffer = Buffer.alloc(stream.size);
  let view = new Uint8Array(stream);
  for (let i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

export default function captureTab(tabId) {
  console.log('captureTab invoked');
  chrome.tabCapture.capture({ audio: true }, function (stream) {
    //!if active tab is not muted -- play stream as srcObject
    handleCapture(stream);
  });
}

//TODO add function which checks for tabs being actively captured
let currentTabId;

function checkActiveTab(capturedTabs) {
  if (
    capturedTabs.some(
      (tab) => tab.tabId === currentTabId && tab.status === 'active',
    )
  ) {
    console.log('tab being captured');
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    currentTabId = tabs[0].id;
  });
}

// TODO add function which returns tabIDs for  audio playing
