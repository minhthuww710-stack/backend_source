const Joi = require('joi');
const { FILTER_SEND_EMAIL } = require('../constants/template.constant');

const allowedValues = FILTER_SEND_EMAIL.map((f) => f.name);

// CREATE NOTIFICATION
const createNotificationSchema = Joi.object({
  title: Joi.string().required().max(100).messages({
    'string.empty': 'Title is required.',
    'any.required': 'Title field cannot be empty.',
    'string.max': 'Title must be less than or equal to 100 characters.',
  }),
  summary: Joi.string().required().messages({
    'string.empty': 'Summary is required.',
    'any.required': 'Summary field cannot be empty.',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Content is required.',
    'any.required': 'Content major field cannot be empty.',
  }),
  image_url: Joi.string()
    .pattern(/\.(jpg|jpeg|png)$/i)
    .required()
    .messages({
      'string.empty': 'Image URL is required.',
      'any.required': 'Image URL field cannot be empty.',
      'string.pattern.base': 'Image must be a valid format (.jpg, .jpeg, .png).',
    }),
});

// UPDATE NOTIFICATION
const updateNotificationSchema = Joi.object({
  title: Joi.string().optional(),
  summary: Joi.string().optional(),
  content: Joi.string().optional(),
  image_url: Joi.string()
    .pattern(/\.(jpg|jpeg|png|gif)$/i)
    .optional()
    .messages({
      'string.pattern.base': 'Image must be a valid format (.jpg, .jpeg, .png, .gif).',
    }),
  active: Joi.boolean().optional(),
});

// CREATE TEMPLATE EMAIL
const createTemplateSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
    'any.required': 'Title field cannot be empty.',
  }),
  subject: Joi.string().required().messages({
    'string.empty': 'Subject is required.',
    'any.required': 'Subject field cannot be empty.',
  }),
  content: Joi.string().required().messages({
    'string.empty': 'Content is required.',
    'any.required': 'Content major field cannot be empty.',
  }),
  send_at: Joi.date().iso().required().messages({
    'date.base': 'Send at must be a valid date.',
    'date.format': 'Send at must be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ).',
    'any.required': 'Send at field cannot be empty.',
  }),
  type_filter: Joi.string()
    .valid(...allowedValues)
    .required()
    .messages({
      'string.empty': 'Type filter is required.',
      'any.only': `Type filter must be one of [${allowedValues.join(', ')}].`,
      'any.required': 'Type filter cannot be empty.',
    }),
  email: Joi.string()
    .email()
    .when('type_filter', {
      is: 'CUSTOM',
      then: Joi.required().messages({
        'string.empty': 'Email is required when type_filter is CUSTOM.',
        'any.required': 'Email must be provided when type_filter is CUSTOM.',
      }),
      otherwise: Joi.optional().allow(''),
    }),
});

module.exports = {
  createNotificationSchema,
  createTemplateSchema,
  updateNotificationSchema,
};
