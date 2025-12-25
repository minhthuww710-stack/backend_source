const express = require('express');
const router = express.Router();
const notificationControllers = require('../../controllers/notification.controller');

router.get('/get-list', notificationControllers.getNotification);

module.exports = router;
