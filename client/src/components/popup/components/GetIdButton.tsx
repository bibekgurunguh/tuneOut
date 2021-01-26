/* global chrome*/
import * as React from 'react';
import './GetIdButton.css';

interface PropsType {
  getId: Function,
  runLoadingAnimation: Function
}

export function GetIdButton({
  getId,
  runLoadingAnimation,
}: PropsType) {
  function handleClick() {
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
