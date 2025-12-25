const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');
const contestRoutes = require('./contest.route');
const manageTeamRoutes = require('./manageTeam.route');
const notificationRoutes = require('./notification.route');
const imageRoutes = require('./image.route');
const mediaRoutes = require('./media.route');

const { verifyTokenAdmin } = require('../../middlewares/auth.middleware');

router.use('/auth', authRoutes);
router.use(verifyTokenAdmin);
router.use('/contest', contestRoutes);
router.use('/image', imageRoutes);
router.use('/manage-team', manageTeamRoutes);
router.use('/media', mediaRoutes);
router.use('/notification', notificationRoutes);

module.exports = router;
