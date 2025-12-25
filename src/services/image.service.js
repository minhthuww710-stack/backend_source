const path = require('path');
const { handleSuccess } = require('../utils/handleResponse.util');
const fs = require('fs').promises;

//----------------------------------ADMIN-------------------------------------
const uploadImage = async (file) => {
  try {
    return handleSuccess({ image: file.filename }, 'Upload image successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------USER-------------------------------------
const getImage = async (name) => {
  try {
    const imagePath = path.join(__dirname, '../images', name);
    await fs.access(imagePath);
    return imagePath;
  } catch (error) {
    return null;
  }
};

const formatImagePath = (name) => {
  try {
    const domain = process.env.DOMAIN_SERVER;
    const imagePath = domain + '/api/v1/common/image/' + name;
    return imagePath;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  uploadImage,
  getImage,
  formatImagePath,
};
