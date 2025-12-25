const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const notificationServices = require('../services/notification.service');
const {
  createNotificationSchema,
  updateNotificationSchema,
  createTemplateSchema,
} = require('../validations/notification.validation');

//----------------------------------ADMIN-------------------------------------
// GET NOTIFICATION ADMIN
const getNotificationAdmin = async (req, res) => {
  try {
    const response = await notificationServices.getNotificationAdmin(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// CREATE NOTIFICATION
const createNotification = async (req, res) => {
  try {
    const { error } = createNotificationSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await notificationServices.createNotification(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// UPDATE NOTIFICATION
const updateNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = updateNotificationSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await notificationServices.updateNotification({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// DELETE NOTIFICATION
const deleteNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await notificationServices.deleteNotification(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// EMAIL FILTER
const getEmailFilter = async (req, res) => {
  try {
    const response = await notificationServices.getEmailFilter();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// CREATE TEMPLATE
const createEmailTemplate = async (req, res) => {
  try {
    const { error } = createTemplateSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await notificationServices.createEmailTemplate(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// GET LIST TEMPLATE EMAIL
const getEmailTemplate = async (req, res) => {
  try {
    const response = await notificationServices.getEmailTemplate(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// SEND EMAIL CONTINUE
const sendEmailContinue = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await notificationServices.sendEmailContinue(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// SEND TEMPLATE EMAIL
const sendEmailTemplate = async (req, res) => {
  try {
    const id = req.params.logid;
    const response = await notificationServices.sendEmailTemplate(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// DELETE TEMPLATE EMAIL
const deleteEmailTemplate = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await notificationServices.deleteEmailTemplate(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------USER-------------------------------------
// GET LIST NOTIFICATION
const getNotification = async (req, res) => {
  try {
    const response = await notificationServices.getNotification(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  getNotification,
  getNotificationAdmin,
  getEmailFilter,
  getEmailTemplate,
  createNotification,
  createEmailTemplate,
  updateNotification,
  deleteNotification,
  deleteEmailTemplate,
  sendEmailTemplate,
  sendEmailContinue,
};
