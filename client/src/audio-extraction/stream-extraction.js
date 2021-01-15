/*global chrome*/
require ('underscore')


const bufferToBase46 = (buffer) => {
  const bytes = new Uint8Array(buffer);

}

const stopRecording = function (recorder) {
  recorder.stop();
  console.log('timeout achieved')
}

const record = function (mediaRecorder) {
  mediaRecorder.start();
  console.log('recorder started');
}

// TODO add tab capture function
const AudioContext = (window.AudioContext || window.webkitAudioContext);

function captureAudio(tabId) {
  console.log('captureAudio invoked')
  chrome.tabCapture.capture({ audio: true }, (tabAudioStream) => {
    if (!tabAudioStream) {
      console.error('no audio stream detected')
    }
    let chunks = []
    console.log('tabaudiostream', tabAudioStream)

    const recordStream = new MediaRecorder(tabAudioStream)

    record(recordStream)

    recordStream.onstop = function(e) {
      let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
      console.log('recorder stopped')
    }

    recordStream.ondataavailable = function(e) {
      chunks.push(e.data)
    }
    console.log('blob')
    console.log('chunks', chunks)



    // const length = 44100 * 6;

    // const sampleRate = 44100;
    // let audioRecorder = new MediaRecorder()


    // const audioCtx = new AudioContext();
    // console.log('audiorecorder', audioRecorder);






    // const audioBuffer = audioCtx.createBuffer(2, length, sampleRate);
    // console.log('audioBuffer', audioBuffer)
    // let audioSample = audioBuffer.getChannelData(tabAudioStream);




  })
}

//TODO audio recorder function



//TODO add function which checks for tabs being actively captured
let currentTabId;

function checkActiveTab(capturedTabs) {
  if (capturedTabs.some(tab => tab.tabId === currentTabId && tab.status === 'active')) {
    console.log('tab being captured')
}

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  currentTabId = tabs[0].id
})
}

// TODO add function which returns tabIDs for  audio playing

module.exports = captureAudio;