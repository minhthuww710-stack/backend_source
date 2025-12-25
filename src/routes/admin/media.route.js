const express = require('express');
const router = express.Router();
const mediaControllers = require('../../controllers/media.controller');

router.post('/create', mediaControllers.adminCreateMedia);

router.put('/update/:id', mediaControllers.adminUpdateMedia);

router.delete('/destroy/:id', mediaControllers.adminDestroyMedia);

router.get('/', mediaControllers.adminGetMedia);

module.exports = router;
