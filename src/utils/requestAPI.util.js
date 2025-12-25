const { default: axios } = require('axios');
const { METHOD } = require('../constants/method.constant');

// ENCODE QUERY STRING
const encodeQueryString = (params = {}) => {
  const newObj = {};
  for (const item in params) {
    if (params[item]) {
      newObj[item] = params[item];
    }
  }
  const keys = Object.keys(newObj);
  return keys.length
    ? '?' +
        keys.map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])).join('&')
    : '';
};

// GET HEADER
const getHeader = (url) => {
  return {
    'x-api-key': getAPIKey(url),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

const requestAPI = async (url, data, method) => {
  try {
    const options = {
      method: method,
      url: method === METHOD.GET ? url + encodeQueryString(data) : url,
      data: data,
      withCredentials: true,
      headers: getHeader(url),
    };
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAPIKey = (url) => {
  let result = '';
  switch (true) {
    case url.includes(process.env.DOMAIN_SERVER_NOWSCAN):
      result = process.env.X_API_KEY_SERVER_NOWSCAN;
      break;
  }
  return result;
};

module.exports = {
  requestAPI,
};
