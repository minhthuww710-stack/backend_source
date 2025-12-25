const express = require('express');
const router = express.Router();
const imageControllers = require('../../controllers/image.controller');
const { imageMiddleware } = require('../../middlewares/image.middleware');

router.post('/upload', imageMiddleware, imageControllers.uploadImage);

module.exports = router;
