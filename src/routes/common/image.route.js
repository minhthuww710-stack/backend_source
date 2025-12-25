const express = require('express');
const router = express.Router();
const imageControllers = require('../../controllers/image.controller');

router.get('/:name', imageControllers.getImage);

module.exports = router;
