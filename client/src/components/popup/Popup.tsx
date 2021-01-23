/* global chrome*/

import * as chrome from 'regenerator-runtime/runtime';
import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import './Popup.css';
import { captureTab } from '../../index-js/index-background';
import  { GetIdButton } from './components/GetIdButton';
const Tuneoutlogo = require('C:/Users/flipo/CW/tuneOut/icons/Tuneoutlogo.svg');
import * as SelectTab from './components/SelectTab'
import { ResponseBox } from './components/ResponseBox'
import Lottie from 'react-lottie';
// import animationData from './animations/loading-animation.json'

interface response {
  
}


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
    const response: any = await captureTab(tabId)
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
      <div className={'container'}>
            <img className={'tuneoutlogo'} src={Tuneoutlogo} alt='tuneOut logo' />
            {/* <SelectTab></SelectTab> */}
            <ResponseBox animation={animation} setSongInfo={''} songInfo={songInfo}></ResponseBox>
            <div className={'idBtn'}>
              <GetIdButton runLoadingAnimation={runLoadingAnimation} getId={getId}></GetIdButton>
            </div>
      </div>
    )
  } return (
    <div className={'container'}>
      <img className={'tuneoutlogo'} src={Tuneoutlogo} alt='tuneOut logo' />
      <ResponseBox animation={animation} setSongInfo={''} songInfo={''}></ResponseBox>
      {/* <SelectTab></SelectTab> */}
      <div className={'idBtn'}>
        <GetIdButton runLoadingAnimation={runLoadingAnimation} getId={getId}></GetIdButton>
      </div>
    </div>
  )
}

