/*global chrome*/
/// <reference types="chrome" />

import 'regenerator-runtime/runtime';
import {
  recordAudioStream,
  duplicateAudioStream,
} from '../utils/audioCaptureHelperFunctions';

export const captureAudioFromCurrentTab = (searchTime: number) => {
  return new Promise<string>((resolve) => {
    try {
      chrome.tabCapture.capture({ audio: true }, function (stream) {
        if (!stream) return;
        const audioCopy = duplicateAudioStream(stream);
        audioCopy.play();
        const data = recordAudioStream(stream, searchTime);
        resolve(data);
      });
    } catch (err) {}
  });
};

// const error: {noAudibleTab: string;} = {
//   noAudibleTab: 'Please select an audible tab',
// }

// function toBuffer (stream) {
//   let buffer = Buffer.alloc(stream.size);
//   let view = new Uint8Array(stream);
//   for (let i = 0; i < buffer.length; ++i) {
//     buffer[i] = view[i];
//   }
//   return buffer;
// }

// Features to add

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
