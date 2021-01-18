const url = require('url');
const fs = require('fs');
const crypto = require('crypto');
const request = require('request');
const axios = require('axios');
const FormData = require ('form-data')

const defaultOptions = {
  host: 'identify-eu-west-1.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type:'audio',
  secure: true,
  access_key: 'a735916ac5e523565ecf5a2d872ac541',
  access_secret: '' //! Store in .env file??
};

function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

function sign(signString, accessSecret) {
  return crypto.createHmac('sha1', accessSecret)
    .update(Buffer.from(signString, 'utf-8'))

    .digest().toString('base64');
}

function identifyAudio(data, options, cb) {

  const current_data = new Date();
  const timestamp = current_data.getTime()/1000;

  const stringToSign = buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp);

  const signature = sign(stringToSign, options.access_secret);

  let formData = new FormData();

  const formOptions = {
    sample: data,
    access_key:options.access_key,
    data_type:options.data_type,
    signature_version:options.signature_version,
    signature:signature,
    sample_bytes:data.length,
    timestamp:timestamp,
  }

  formData.append('formOptions', formOptions);

  axios({
    method: 'POST',
    url: "http://"+options.host + options.endpoint,
    data: formData,
    headers: {'Content-Type': 'multipart/form-data' }
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (err) {
        console.log('fail');
    });


  // axios.post({
  //   method: 'POST',
  //   url: "http://"+options.host + options.endpoint,
  //   data: formData
  // }, cb);
}


const bitmap = fs.readFileSync('../../../test-audio/toxic-sample-15s.mp3');
// const bitmap2 = fs.readFileSync('bitmap2.txt')

// console.log(Buffer.from(bitmap2, 'utf-16'))



identifyAudio(Buffer.from(bitmap), defaultOptions, function (err, httpResponse, body) {
  if (err) console.log(err);
  console.log(body);
});
// module.exports = {identifyAudio, defaultOptions};
