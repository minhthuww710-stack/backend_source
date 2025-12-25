const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const authServices = require('../services/auth.service');
const {
  loginAdminSchema,
  changePasswordAdminSchema,
  loginUserSchema,
} = require('../validations/auth.validation');

//----------------------------------ADMIN-------------------------------------
// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const { error } = loginAdminSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const response = await authServices.loginAdmin({ ...req.body, clientIP, userAgent });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// CHANGE PASSWORD ADMIN
const changePasswordAdmin = async (req, res) => {
  try {
    const { userid } = req.data;
    const { error } = changePasswordAdminSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await authServices.changePasswordAdmin({ ...req.body, userid });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// HISTORY LOGIN
const historyLogin = async (req, res) => {
  try {
    const { userid } = req.data;
    const response = await authServices.historyLogin(userid);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------USER-------------------------------------
// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await authServices.loginUser({ ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  loginAdmin,
  loginUser,
  changePasswordAdmin,
  historyLogin,
};
