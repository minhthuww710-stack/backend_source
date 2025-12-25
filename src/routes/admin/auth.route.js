const express = require('express');
const router = express.Router();
const authControllers = require('../../controllers/auth.controller');
const { verifyTokenAdmin } = require('../../middlewares/auth.middleware');

router.post('/login', authControllers.loginAdmin);
router.use(verifyTokenAdmin);
router.put('/change-password', authControllers.changePasswordAdmin);
router.get('/history-login', authControllers.historyLogin);

module.exports = router;
