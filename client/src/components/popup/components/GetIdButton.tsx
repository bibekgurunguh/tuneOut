/* global chrome*/
import * as React from 'react';
import './GetIdButton.css';
// import ResponseBox from './ResponseBox';
// import identifyAudio from '../../../Arc-api/audio-request.ts'

export function GetIdButton({
  // listAllTabs,
  getId,
  runLoadingAnimation,
}) {
  function handleClick(event) {
    runLoadingAnimation();
    getId();
  }

  return (
    <div>
      <button className={'button'} onClick={handleClick}>
        identify
      </button>
    </div>
  );
}
