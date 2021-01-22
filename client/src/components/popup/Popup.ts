/* global chrome*/

import React, { useState, useEffect } from 'react';
import Styles from './Popup.css';
import captureTab from '../../index-js/index-background.ts';
import GetIdButton from './components/GetIdButton.ts';
import Tuneoutlogo from '../../../../icons/Tuneoutlogo.svg';
import SelectTab from './components/SelectTab.ts'
import ResponseBox from './components/ResponseBox.ts'
import Lottie from 'react-lottie';
import animationData from './animations/loading-animation.json'

export default function Popup() {

  const [songInfo, setSongInfo] = useState([]);
  const [tabList, setTabs] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [animation, setAnimation] = useState(false)

  let runLoadingAnimation = () => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
    }, 9000)
  }

  const listAllTabs = async () => {
    const response =  await chrome.tabs.query({audible: true}, function(tabs) {
      console.log('tabs', tabs);
      return tabs;
    });
    setTabs(response)
  };

  const getId = async (tabId) => {
    const response = await captureTab(tabId)
    console.log('response', response);
    if (response.length < 30) {
      setErrorMessage(response);
      setSongInfo([]);
      return;
    } else {
      JSON.parse(response)
      setAnimation(false)
      setSongInfo(response)
      console.log(songInfo);
    };
  };

  if (songInfo.length) {
    return (
      <div className={Styles.container}>
            <img className={Styles.tuneoutlogo} src={Tuneoutlogo} alt='tuneOut logo' />
            <SelectTab></SelectTab>
            <ResponseBox runLoadingAnimation={runLoadingAnimation} animation={animation} songInfo={songInfo}></ResponseBox>
            <GetIdButton className={Styles.idBtn} getId={getId}></GetIdButton>
      </div>
    )
  } return (
    <div className={Styles.container}>
      <img className={Styles.tuneoutlogo} src={Tuneoutlogo} alt='tuneOut logo' />
      <ResponseBox runLoadingAnimation={runLoadingAnimation} animation={animation} errorMessage={errorMessage}></ResponseBox>
      <SelectTab></SelectTab>
      <GetIdButton runLoadingAnimation={runLoadingAnimation} className={Styles.idBtn} listAllTabs={listAllTabs} getId={getId}></GetIdButton>
    </div>
  )
}

