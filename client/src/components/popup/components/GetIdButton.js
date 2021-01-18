/* global chrome*/
import React from 'react'
import Styles from './GetIdButton.css'
// import identifyAudio from '../../../Arc-api/audio-request.js'



export default function GetIdButton({ getId }) {

 async function handleClick(event) {
    console.log('button clicked :)')
  const ArrayBuffer = await getId()

  }

  return (
    <div>
        <button className={Styles.button} onClick={handleClick}>identify</button>
    </div>
  )
}
