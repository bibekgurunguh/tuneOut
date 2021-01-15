/*global chrome*/
require ('underscore')


const bufferToBase46 = (buffer) => {
  const bytes = new Uint8Array(buffer);
}

// TODO add tab capture function



function handleCapture(stream) {
  const options = { type: 'audio/webm' };
  const recorder = new MediaRecorder(stream, options);
  recorder.start();
  console.log('recorder started');
  setTimeout(() => {
    let chunks =[];
    recorder.ondataavailable = function(e) {
      chunks.push(e.data)
      let reader = new FileReader();
      reader.onloadend = () => {
        console.log('reader.result', reader.result)
      }
      reader.readAsDataURL(e.data);
    }
    recorder.stop()
    console.log('recorder stopped')
    console.log('chunks', chunks)
    let audio = new Audio();
    audio.scrObject = stream
    audio.play()


    console.log('audio', audio)
    //~ recorder.onstop to handle data
    console.log('recorder', recorder);
    console.log('recorder-data', recorder.data)
  }, 6000);


}

function captureTab (tabId) {
  console.log('captureTab invoked')
  chrome.tabCapture.capture({ audio: true }, function(stream) {
    handleCapture(stream);
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


// let chunks = []
// console.log('tabaudiostream', tabAudioStream)

// const recordStream = new MediaRecorder(tabAudioStream)

// record(recordStream)

// recordStream.onstop = function(e) {
//   let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});
//   console.log('recorder stopped')
// }

// recordStream.ondataavailable = function(e) {
//   chunks.push(e.data)
// }
// console.log('blob')
// console.log('chunks', chunks)

module.exports = captureTab;