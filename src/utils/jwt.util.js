const jwt = require('jsonwebtoken');

// CREATE TOKEN ADMIN
function createTokenAdmin(payload) {
  const secret = process.env.AUTH_SECRET_KEY_ADMIN;
  return jwt.sign(payload, secret, { expiresIn: '8h' });
}

// CREATE TOKEN USER
function createTokenUser(payload) {
  const secret = process.env.AUTH_SECRET_KEY_USER;
  return jwt.sign(payload, secret, { expiresIn: '12h' });
}

// VERIFY TOKEN ADMIN
function verifyTokenJWTAdmin(token) {
  try {
    const secret = process.env.AUTH_SECRET_KEY_ADMIN;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

// VERIFY TOKEN USER
function verifyTokenJWTUser(token) {
  try {
    const secret = process.env.AUTH_SECRET_KEY_USER;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

module.exports = {
  createTokenAdmin,
  createTokenUser,
  verifyTokenJWTAdmin,
  verifyTokenJWTUser,
};
