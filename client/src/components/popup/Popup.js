/* global chrome*/


import React from 'react';
import './Popup.css';
import captureAudio from '../../audio-extraction/stream-extraction';
import GetIdButton from './GetIdButton.js';

export default function Popup() {



  const getId = (tabId) => {
    captureAudio(tabId);
  }

  return (
    <div className='box'>
      <h1>test-popup</h1>
      <GetIdButton className='idBtn' getId={getId}></GetIdButton>
    </div>
  )
}

