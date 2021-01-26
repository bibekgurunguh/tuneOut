// const url = require('url');

import FormData from 'form-data';
import fetch from 'node-fetch';

const { createHmac } = require('crypto');
const axios = require('axios');

interface ApiOptions {
  host: string;
  endpoint: string;
  signature_version: string;
  data_type: string;
  secure: boolean;
  access_key: string;
  access_secret: string;
}

export const defaultApiOptions: ApiOptions = {
  host: 'identify-eu-west-1.acrcloud.com',
  endpoint: '/v1/identify',
  signature_version: '1',
  data_type: 'audio',
  secure: true,
  access_key: 'a735916ac5e523565ecf5a2d872ac541',
  access_secret: 'QO3uR9K1GC626FjTLADGvQ7wWYWlzciJEs8VukbU', //! Store in .env file??
};

export const concatenateToSignatureString = (
  method: string,
  uri: string,
  accessKey: string,
  dataType: string,
  signatureVersion: string,
  timestamp: number,
) => {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join(
    '\n',
  );
};

export const createEncodedHashedSignature = (
  signString: string,
  accessSecret: string,
): string => {
  return createHmac('sha1', accessSecret)
    .update(Buffer.from(signString, 'utf-8'))

    .digest()
    .toString('base64');
};

export const requestSongInfoUsingBlob = (
  data: Blob,
  options: ApiOptions,
  cb: Function,
) => {
  const timestamp = new Date().getTime() / 1000;

  const signatureString = concatenateToSignatureString(
    'POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp,
  );

  const signature = createEncodedHashedSignature(
    signatureString,
    options.access_secret,
  );

  const form = new FormData();
  form.append('sample', data);
  form.append('sample_bytes', data.size);
  form.append('access_key', options.access_key);
  form.append('data_type', options.data_type);
  form.append('signature_version', options.signature_version);
  form.append('signature', signature);
  form.append('timestamp', timestamp);

  fetch('http://' + options.host + options.endpoint, {
    method: 'POST',
    body: form,
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      cb(res, null);
    })
    .catch((err) => {
      cb(null, err);
    });
};
