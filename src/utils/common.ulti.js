const bcrypt = require('bcrypt');
const saltRounds = 10;

// FIXED NUMBER
const fixedNumber = (num) => {
  if (!num) return num;
  return num.toFixed(2);
};

// RANDOM NUMBER
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//
const generateRandomNumber = () => {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber.toString();
};

// HASH BCRYPT
const hashBcrypt = (data) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
        return;
      }
      bcrypt.hash(data, salt, (err, hash) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(hash);
      });
    });
  });
};

// COMPARE
const compareBcrypt = (hash, data) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      if (result) {
        resolve(true);
        return;
      } else {
        resolve(false);
        return;
      }
    });
  });
};

function generateRandomString(length = 12) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

// CREATE SLUG
const createSlug = (title) => {
  return title
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

module.exports = {
  fixedNumber,
  getRandomNumber,
  generateRandomNumber,
  hashBcrypt,
  compareBcrypt,
  createSlug,
  generateRandomString,
};
