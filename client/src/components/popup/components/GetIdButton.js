/* global chrome*/
import React from 'react'
import Styles from './GetIdButton.css'
// import identifyAudio from '../../../Arc-api/audio-request.js'



export default function GetIdButton({ getId }) {

function handleClick(event) {
    console.log('button clicked :)')
  getId()
}

  return (
    <div>
        <button className={Styles.button} onClick={handleClick}>identify</button>
    </div>
  )
}
