const Joi = require('joi');

// SEND CONTACT
const sendContactSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required.',
    'any.required': 'Name field cannot be empty.',
  }),
  email: Joi.string().required().email().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
    'any.required': 'Email field cannot be empty.',
  }),
  phone_number: Joi.string()
    .required()
    .pattern(/^0[0-9]{9}$/)
    .messages({
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number field cannot be empty.',
      'string.pattern.base':
        'Invalid phone number. Please enter in correct format (10 digits starting with 0).',
    }),
  message: Joi.string().required().messages({
    'string.empty': 'Message is required.',
    'any.required': 'Message field cannot be empty.',
  }),
});

module.exports = {
  sendContactSchema,
};
