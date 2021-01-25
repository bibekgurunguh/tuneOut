// const url = require('url');

import FormData from 'form-data';
import * as fetch from 'node-fetch';


const { createHmac } = require('crypto');
// const request = require('request');
const axios = require('axios');
// let FormData = require('form-data');
// let fetch = require('node-fetch');

// const FormData = require ('form-data')

export const defaultOptions = {
  host: 'identify-eu-west-1.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type:'audio',
  secure: true,
  access_key: 'a735916ac5e523565ecf5a2d872ac541',
  access_secret: 'QO3uR9K1GC626FjTLADGvQ7wWYWlzciJEs8VukbU' //! Store in .env file??
};

export function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

export function sign(signString, accessSecret) {
  return createHmac('sha1', accessSecret)
    .update(Buffer.from(signString, 'utf-8'))

    .digest().toString('base64');
}


export function identify_v2(data, options, cb) {

  const current_data = new Date();
  const timestamp = current_data.getTime()/1000;

  const stringToSign = buildStringToSign('POST',
      options.endpoint,
      options.access_key,
      options.data_type,
      options.signature_version,
      timestamp);

  const defaultOptions = {
    host: 'identify-eu-west-1.acrcloud.com',
    endpoint: '/v1/identify',
    signature_version: '1',
    data_type:'audio',
    secure: true,
    access_key: 'a735916ac5e523565ecf5a2d872ac541',
    access_secret: 'QO3uR9K1GC626FjTLADGvQ7wWYWlzciJEs8VukbU' //! Store in .env file??
  };

  const signature = sign(stringToSign, options.access_secret);

  const form = new FormData();
  form.append('sample', data);
  form.append('sample_bytes', data.length);
  form.append('access_key', options.access_key);
  form.append('data_type', options.data_type);
  form.append('signature_version', options.signature_version);
  form.append('signature', signature);
  form.append('timestamp', timestamp);

  fetch("http://"+options.host + options.endpoint,
      {method: 'POST', body: form })
      .then((res) => {return res.text()})
      .then((res) => {cb(res, null)})
      .catch((err) => {cb(null, err)});
}
