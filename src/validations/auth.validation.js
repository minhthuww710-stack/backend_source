const Joi = require('joi');

const loginAdminSchema = Joi.object({
  username: Joi.string().required().max(50).messages({
    'string.base': 'username must be a string type',
    'any.required': 'username is required',
    'string.max': 'username should not exceed 50 characters',
  }),
  password: Joi.string().required().max(50).min(6).messages({
    'string.base': 'Password must be a string type',
    'any.required': 'Password is required',
    'string.max': 'Password should not exceed 50 characters',
  }),
});

const changePasswordAdminSchema = Joi.object({
  password: Joi.string().required().max(50).min(6).messages({
    'string.base': 'Password must be a string type',
    'any.required': 'Password is required',
    'string.max': 'Password should not exceed 50 characters',
    'string.min': 'Password must be at least 6 characters long',
  }),
  newPassword: Joi.string().required().max(50).min(6).messages({
    'string.base': 'new password must be a string type',
    'any.required': 'new password is required',
    'string.min': 'new password must be at least 6 characters long',
    'string.max': 'new password should not exceed 50 characters',
  }),
});

const loginUserSchema = Joi.object({
  wallet: Joi.string().required().max(100).messages({
    'string.base': 'wallet must be a string type',
    'any.required': 'wallet is required',
    'string.max': 'wallet should not exceed 100 characters',
  }),
});

module.exports = {
  loginAdminSchema,
  loginUserSchema,
  changePasswordAdminSchema,
};
