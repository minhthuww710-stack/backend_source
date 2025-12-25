const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');
const contestRoutes = require('./contest.route');

const { verifyTokenUser } = require('../../middlewares/auth.middleware');

router.use('/auth', authRoutes);
router.use(verifyTokenUser);
router.use('/contest', contestRoutes);

module.exports = router;
