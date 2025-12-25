const { METHOD } = require('../constants/method.constant');
const { requestAPI } = require('../utils/requestAPI.util');

// GET LOCATION BY IP
const getLocationByIP = async ({ ip }) => {
  try {
    const url = 'https://api.ip2location.io';
    const payload = {
      key: process.env.GEOLOCATION_KEY,
      ip,
    };
    const res = await requestAPI(url, payload, METHOD.GET);
    return res;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getLocationByIP,
};
