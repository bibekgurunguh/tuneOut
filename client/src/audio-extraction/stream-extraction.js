/*global chrome*/

// TODO add tab capture function
// TODO audio recorder function

let bitmapBuffer;

let recorder;

// let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function handleCapture(stream) {
  const options = { mimeType: 'audio/webm; codecs=opus' };
  recorder = new MediaRecorder(stream, options);
  recorder.start();
  console.log('recorder started');
  setTimeout(() => {
    let chunks =[];
    recorder.ondataavailable = function(e) {
      chunks.push(e.data)
      let blob = new Blob([e.data], { type: 'audio/webm' });
      let reader = new FileReader();

      console.log('blob', blob)

      reader.onloadend = () => {
        console.log('reader.result', reader.result)
        bitmapBuffer = new Uint8Array(reader.result)
        console.log('bitmapbuffer', bitmapBuffer);
        console.log('bitmapbuffer[0]', bitmapBuffer[0])
      }


      bitmapBuffer = reader.readAsArrayBuffer(blob);
      console.log('bitmapbuffer', bitmapBuffer)

      // fs.writeFile("./testaudio.txt", "Hey there!", function(err) {
      //     if(err) {
      //         return console.log(err);
      //     }
      //     console.log("The file was saved!");
      // });
      // blob.arrayBuffer().then(buffer => encodeWAV(buffer))
    }
    recorder.stop()
    console.log('recorder stopped')
    console.log('buffer')
    let audio = new Audio();
    audio.scrObject = stream
    audio.play()

    console.log('audio', audio)
    //~ recorder.onstop to handle data
    console.log('recorder', recorder);
    console.log('recorder-data', recorder.data)

    // identifyAudio(bitmapBuffer, defaultOptions, function (err, httpResponse, body) {
    //   if (err) console.log(err);
    //   console.log(body);
    // });
  }, 6000);

  return bitmapBuffer
}

export default function captureTab (tabId) {
  console.log('captureTab invoked')
  chrome.tabCapture.capture({ audio: true }, function(stream) {
    handleCapture(stream);
  })
}




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
