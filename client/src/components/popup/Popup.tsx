/* global chrome*/

import React from 'react';
import { useState, useEffect } from 'react';
import './Popup.css';
import { captureAudioFromCurrentTab } from '../../index-js/index-background';
import  { GetIdButton } from './components/GetIdButton';
import Tuneoutlogo from '../../../../icons/Tuneoutlogo.svg';
import { ResponseBox } from './components/ResponseBox';
import { getSearchTime } from '../../utils/audioCaptureHelperFunctions';

export default function Popup() {

  const [stringifiedSongInfo, setStringifiedSongInfo] = useState('');
  const [tabList, setTabs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [animation, setAnimation] = useState(false);
  const [searchTime, setSearchTime] = useState(6000);

  let runLoadingAnimation = () => {
    setAnimation(true)
    setTimeout(() => {
      setAnimation(false)
    }, 9000)
  }

  async function getId () {
    const response: string = await captureAudioFromCurrentTab(searchTime)
    if (response.length < 30) {
      setErrorMessage(response);
      setStringifiedSongInfo('');
      return;
    } else {
      setAnimation(false)
      setStringifiedSongInfo(response)
      console.log('response in getId: ', response);
    };
  };
  
  // const handleSetSearchTime = async (sec: number) => {
  //   await chrome.storage.local.set({searchTime: sec}, function() {
  //     console.log('Search time is set to ' + sec);
  //   });
  // }

  useEffect(() => {
    setSearchTime(() => getSearchTime());
  }, []);

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