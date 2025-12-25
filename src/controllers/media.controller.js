const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const mediaServices = require('../services/media.service');
const { createMediaSchema, updateMediaSchema } = require('../validations/media.validation');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET MEDIA
const adminGetMedia = async (req, res) => {
  try {
    const response = await mediaServices.adminGetMedia(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN CREATE MEDIA
const adminCreateMedia = async (req, res) => {
  try {
    const { error } = createMediaSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await mediaServices.adminCreateMedia(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE MEDIA
const adminUpdateMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = updateMediaSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await mediaServices.adminUpdateMedia({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// ADMIN UPDATE MEDIA
const adminDestroyMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await mediaServices.adminDestroyMedia(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------COMMON-------------------------------------
// GET MEDIA
const getMedia = async (req, res) => {
  try {
    const response = await mediaServices.getMedia(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  adminGetMedia,
  adminCreateMedia,
  adminUpdateMedia,
  adminDestroyMedia,
  getMedia,
};
