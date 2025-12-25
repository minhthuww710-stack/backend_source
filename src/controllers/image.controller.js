const { serverError, handleResponse } = require('../utils/handleResponse.util');
const imageServices = require('../services/image.service');

//----------------------------------ADMIN-------------------------------------
// UPLOAD IMAGE
const uploadImage = async (req, res) => {
  try {
    const response = await imageServices.uploadImage(req.file);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------USER-------------------------------------
// GET IMAGE
const getImage = async (req, res) => {
  try {
    const name = req.params.name;
    const imagePath = await imageServices.getImage(name);
    if (!imagePath) return res.status(404).send('Not found');
    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  uploadImage,
  getImage,
};
