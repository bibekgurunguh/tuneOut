import * as React from 'react';
import './Options.css';

export default function Options() {

  const setSearchTime = (sec: number) => {
    chrome.storage.local.set({searchTime: sec}, function() {
      console.log('Search time is set to ' + sec);
    });
  }

  const getCurrentSearchTime = () => {
    chrome.storage.local.get(['searchTime'], (result) => {
      console.log('Value currently is ' + result.searchTime);
      return result.searchTime;
    });
  };

  return (
    <div>
      <h1>Settings</h1>
      <button onClick={() => setSearchTime(3000)}>3 Seconds</button>
      <button onClick={() => setSearchTime(8000)}>8 Seconds</button>
    </div>
  )
}
