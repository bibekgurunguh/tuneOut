/* global chrome*/
import React from 'react';
import Styles from './GetIdButton.css';
import ResponseBox from './ResponseBox.ts';
// import identifyAudio from '../../../Arc-api/audio-request.ts'

export default function GetIdButton({
  listAllTabs,
  getId,
  runLoadingAnimation,
}) {
  function handleClick(event) {
    console.log('button clicked :)');
    runLoadingAnimation();
    console.log('loading function works');
    getId();
  }

  return (
    <div>
      <button className={Styles.button} onClick={handleClick}>
        identify
      </button>
    </div>
  );
}
