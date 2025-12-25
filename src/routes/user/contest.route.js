const express = require('express');
const router = express.Router();
const contestControllers = require('../../controllers/contest.controller');
const { requireRole } = require('../../middlewares/auth.middleware');

router.get('/my-team', contestControllers.myTeam);

router.post('/register-team', contestControllers.registerTeam);
router.post('/submit-preliminary', contestControllers.submitPreliminary);

router.put('/update-team', requireRole('LEADER'), contestControllers.updateTeam);

module.exports = router;
