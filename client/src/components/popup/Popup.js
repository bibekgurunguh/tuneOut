/* global chrome*/


import React from 'react';
import Styles from './Popup.css';
import captureTab from '../../audio-extraction/stream-extraction';
import GetIdButton from './components/GetIdButton.js';
import Tuneoutlogo from '../../../../icons/Tuneoutlogo.svg';
import SelectTab from './components/SelectTab.js'
// import identifyAudio from '../../Arc-api/audio-request.js'
const crypto = require('crypto');
const axios = require('axios');
// const request = require('request');



export default function Popup() {


  // const defaultOptions = {
  //   host: 'identify-eu-west-1.acrcloud.com',
  //   endpoint: '/v1/identify',
  //   signature_version: '1',
  //   data_type:'audio',
  //   secure: true,
  //   access_key: 'a735916ac5e523565ecf5a2d872ac541',
  //   access_secret: 'QO3uR9K1GC626FjTLADGvQ7wWYWlzciJEs8VukbU' //! Store in .env file??
  // };

  // function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  //   return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
  // }

  // function sign(signString, accessSecret) {
  //   return crypto.createHmac('sha1', accessSecret)
  //     .update(Buffer.from(signString, 'utf-8'))
  //     .digest().toString('base64');
  // }

  // function identifyAudio(data, options, cb) {

  //   const current_data = new Date();
  //   const timestamp = current_data.getTime()/1000;

  //   const stringToSign = buildStringToSign('POST',
  //     options.endpoint,
  //     options.access_key,
  //     options.data_type,
  //     options.signature_version,
  //     timestamp);

  //   const signature = sign(stringToSign, options.access_secret);

  //   const formData = {
  //     sample: data,
  //     access_key:options.access_key,
  //     data_type:options.data_type,
  //     signature_version:options.signature_version,
  //     signature:signature,
  //     sample_bytes:data.length,
  //     timestamp:timestamp,
  //   }
  //   axios.post({
  //     url: "http://"+options.host + options.endpoint,
  //     method: 'POST',
  //     formData: formData
  //   }, cb);
  // }

  const getId = (tabId) => {
    captureTab(tabId)
  }

  return (
    <div className={Styles.container}>
          <img className={Styles.tuneoutlogo} src={Tuneoutlogo} alt='tuneOut logo' />
          <SelectTab></SelectTab>
          <GetIdButton className={Styles.idBtn} getId={getId}></GetIdButton>
    </div>
  )
}

