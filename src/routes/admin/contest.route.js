const express = require('express');
const router = express.Router();
const contestControllers = require('../../controllers/contest.controller');

router.get('/get-topic', contestControllers.getTopicAdmin);
router.get('/get-timeline', contestControllers.getTimelineAdmin);

router.post('/update-topic/:id', contestControllers.updateTopic);
router.post('/update-timeline/:id', contestControllers.updateTimeline);
router.delete('/delete-timeline/:id', contestControllers.deleteTimeline);

router.put('/registration-deadline', contestControllers.registrationDeadline);

module.exports = router;
