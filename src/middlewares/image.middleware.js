const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { badRequest } = require('../utils/handleResponse.util');

const uploadDir = path.join(__dirname, '../images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only JPG, JPEG, PNG, and GIF files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('image');

const imageMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err || !req.file) return badRequest('No file uploaded', res);
    next();
  });
};

module.exports = {
  imageMiddleware,
};
