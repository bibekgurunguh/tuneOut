/* global chrome*/

import React from 'react';
import { useState } from 'react';
import './Popup.css';
import { captureAudioFromCurrentTab } from '../../index-js/index-background';
import  { GetIdButton } from './components/GetIdButton';
import Tuneoutlogo from '../../../../icons/Tuneoutlogo.svg';
import { ResponseBox } from './components/ResponseBox'

export default function Popup() {

  const [stringifiedSongInfo, setStringifiedSongInfo] = useState('');
  const [tabList, setTabs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [animation, setAnimation] = useState(false);

  let runLoadingAnimation = () => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
    }, 9000)
  }

  async function getId () {
    const response: string = await captureAudioFromCurrentTab()
    if (response.length < 30) {
      setErrorMessage(response);
      setStringifiedSongInfo('');
      return;
    } else {
      setAnimation(false)
      setStringifiedSongInfo(response)
      // console.log('response in getId: ', response);
    };
  };

  if (stringifiedSongInfo.length) {
    return (
      <div className='container'>
            <img className='tuneoutlogo' src={Tuneoutlogo} alt='tuneOut logo' />
            {/* <SelectTab></SelectTab> */}
            <ResponseBox animation={animation} stringifiedSongInfo={stringifiedSongInfo}></ResponseBox>
            <div className='idBtn'>
              <GetIdButton runLoadingAnimation={runLoadingAnimation} getId={getId}></GetIdButton>
            </div>
      </div>
    )
  } return (
    <div className='container'>
      <div>Typescript</div>
      <img className='tuneoutlogo' src={Tuneoutlogo} alt='tuneOut logo' />
      <ResponseBox animation={animation} stringifiedSongInfo={''}></ResponseBox>
      {/* <SelectTab></SelectTab> */}
      <div className='idBtn'>
        <GetIdButton runLoadingAnimation={runLoadingAnimation} getId={getId}></GetIdButton>
      </div>
    </div>
  )

  // return (
  //   <h1>Testing</h1>
  // )
}
















  // const listAllTabs = async () => {
  //   const response =  await chrome.tabs.query({audible: true}, function(tabs) {
  //     console.log('tabs', tabs);
  //     return tabs;
  //   });
  //   setTabs(response)
  // };