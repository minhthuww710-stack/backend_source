const express = require('express');
const router = express.Router();
const contestControllers = require('../../controllers/contest.controller');

router.get('/get-topic', contestControllers.getTopic);
router.get('/get-timeline', contestControllers.getTimeline);

module.exports = router;
