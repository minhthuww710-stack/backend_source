const express = require('express');
const router = express.Router();
const contactRoutes = require('./contact.route');
const contestRoutes = require('./contest.route');
const imageRoutes = require('./image.route');
const notificationRoutes = require('./notification.route');
const mediaRoutes = require('./media.route');

router.use('/contact', contactRoutes);
router.use('/contest', contestRoutes);
router.use('/image', imageRoutes);
router.use('/media', mediaRoutes);
router.use('/notification', notificationRoutes);

module.exports = router;
