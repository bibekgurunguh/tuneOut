/* global chrome*/

import React, { useState, useEffect } from 'react';
import Styles from './Popup.css';
import captureTab from '../../index-js/index-background.js';
import GetIdButton from './components/GetIdButton.js';
import Tuneoutlogo from '../../../../icons/Tuneoutlogo.svg';
import SelectTab from './components/SelectTab.js'
import ResponseBox from './components/ResponseBox.js'



export default function Popup() {

  const [songInfo, setSongInfo] = useState([]);

  const getId = async (tabId) => {
    const response = await captureTab(tabId)
    console.log('response', response);
    JSON.parse(response)
    setSongInfo(response)
    console.log(songInfo);
  };

  if (songInfo.length) {
    return (
      <div className={Styles.container}>
            <img className={Styles.tuneoutlogo} src={Tuneoutlogo} alt='tuneOut logo' />
            <SelectTab></SelectTab>
            <ResponseBox songInfo={songInfo}></ResponseBox>
            <GetIdButton className={Styles.idBtn} getId={getId}></GetIdButton>
      </div>
    )
  } return (
    <div className={Styles.container}>
      <img className={Styles.tuneoutlogo} src={Tuneoutlogo} alt='tuneOut logo' />
      <ResponseBox></ResponseBox>
      <SelectTab></SelectTab>
      <GetIdButton className={Styles.idBtn} getId={getId}></GetIdButton>
    </div>
  )
}

