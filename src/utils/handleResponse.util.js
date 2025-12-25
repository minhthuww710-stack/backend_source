const createHttpError = require('http-errors');
const { saveLogsError } = require('./file.util');
const serverError = (res, error, route) => {
  saveLogsError(error.toString(), route.replaceAll('/', '-'));
  const httpError = createHttpError.InternalServerError();
  return res.status(httpError.status).json({
    status: false,
    data: null,
    message: httpError.message,
  });
};

const badRequest = (err, res) => {
  const error = createHttpError.BadRequest(err);
  return res.status(error.status).json({
    status: false,
    data: null,
    message: err,
  });
};

const unAuthorzation = (res) => {
  const error = createHttpError.Unauthorized();
  return res.status(error.status).json({
    status: false,
    data: null,
    message: error.message,
  });
};

const forbidden = (res) => {
  const error = createHttpError.Forbidden();
  return res.status(error.status).json({
    status: false,
    data: null,
    message: error.message,
  });
};

const notFount = (req, res) => {
  const error = createHttpError.NotFound('This route is not defined');
  return res.status(error.status).json({
    status: false,
    data: null,
    message: error.message,
  });
};

const handleSuccess = (data, mes) => {
  return {
    status: true,
    data,
    message: mes,
  };
};

const handleFailed = (mes) => {
  return {
    status: false,
    data: null,
    message: mes,
  };
};

const handleResponse = (res, data) => {
  return res.status(data.status ? 200 : 400).json(data);
};

module.exports = {
  serverError,
  badRequest,
  forbidden,
  notFount,
  unAuthorzation,
  handleSuccess,
  handleResponse,
  handleFailed,
};
