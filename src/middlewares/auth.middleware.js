const { unAuthorzation, forbidden } = require('../utils/handleResponse.util');
const { verifyTokenJWTUser, verifyTokenJWTAdmin } = require('../utils/jwt.util');

// VERIFY TOKEN USER
const verifyTokenUser = async (req, res, next) => {
  const authorization = req.header('Authorization');
  if (!authorization) return unAuthorzation(res);
  const token = authorization.split(' ')[1];
  const data = verifyTokenJWTUser(token);
  if (!data) return unAuthorzation(res);
  req.data = data;
  next();
};

const verifyTokenAdmin = async (req, res, next) => {
  const authorization = req.header('Authorization');
  if (!authorization) return unAuthorzation(res);
  const token = authorization.split(' ')[1];
  const data = verifyTokenJWTAdmin(token);
  if (!data || data.role !== 'ADMIN') return unAuthorzation(res);
  req.data = data;
  next();
};

// VERIFY API KEY
const verifyApiKey = async (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  if (!apiKey || apiKey !== process.env.API_KEY) return unAuthorzation(res);
  next();
};

// ROLE USER
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.data || req.data.role !== role) return forbidden(res);
    next();
  };
};

module.exports = {
  verifyTokenUser,
  verifyTokenAdmin,
  verifyApiKey,
  requireRole,
};
