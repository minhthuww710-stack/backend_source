const express = require('express');
const router = express.Router();
const mediaControllers = require('../../controllers/media.controller');

router.get('/', mediaControllers.getMedia);

module.exports = router;
