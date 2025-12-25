const Joi = require('joi');

// ADMIN CREATE MEDIA SCHEMA
const createMediaSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title cannot be empty',
    'any.required': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be empty',
    'any.required': 'Description is required',
  }),
  youtube_url: Joi.string().required().uri().messages({
    'string.empty': 'Youtube url is required.',
    'any.required': 'Youtube url field cannot be empty.',
    'string.uri': 'Invalid youtube url. Please enter a valid link ',
  }),
  type: Joi.string().required().allow('VIDEO').messages({
    'any.only': 'Type must be "VIDEO"',
    'any.required': 'Type is required',
    'string.base': 'Type must be a string',
  }),
});

// ADMIN UPDATE MEDIA SCHEMA
const updateMediaSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  youtube_url: Joi.string().optional().uri(),
  type: Joi.string().optional(),
  active: Joi.boolean().optional(),
});

module.exports = {
  createMediaSchema,
  updateMediaSchema,
};
