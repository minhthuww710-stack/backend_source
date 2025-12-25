const express = require('express');
const router = express.Router();
const manageTeamControllers = require('../../controllers/manageTeam.controller');

router.get('/list-team', manageTeamControllers.listTeam);
router.get('/users', manageTeamControllers.listUser);
router.get('/detail-team/:id', manageTeamControllers.detailTeam);
router.get('/detail-team-contract/:id', manageTeamControllers.detailTeamContract);
router.get('/preliminary', manageTeamControllers.listPreliminary);
router.get('/semifinal', manageTeamControllers.listSemifinal);

router.post('/export-excel', manageTeamControllers.exportExcel);
router.post('/export-excel-preliminary', manageTeamControllers.exportExcelPreliminary);
router.post('/set-final', manageTeamControllers.setFinal);

router.put('/team/:id', manageTeamControllers.updateTeam);

module.exports = router;
