import * as React from 'react';
import './Options.css';

export default function Options() {

  const setSearchTime = (sec: number) => {
    chrome.storage.local.set({searchTime: sec}, function() {
      console.log('Search time is set to ' + sec);
    });
  }

  return (
    <div className={'optionsContainer'}>
      <div className={'container'}>
        <h1>Settings</h1>
        <div className={'settingContainer'}>
          <div className={'settingLabel'}>Search Behaviour</div>
          <div className={'buttonsContainer'}>
            <button onClick={() => setSearchTime(3000)}>Fast</button>
            <button onClick={() => setSearchTime(7000)}>Balanced</button>
            <button onClick={() => setSearchTime(12000)}>Accurate</button>
          </div>
        </div>
      </div>
    </div>
  )
}
