const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const contactServices = require('../services/contact.service');
const { sendContactSchema } = require('../validations/contact.validation');

// SEND CONTACT US
const sendContact = async (req, res) => {
  try {
    const { error } = sendContactSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contactServices.sendContact(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  sendContact,
};
