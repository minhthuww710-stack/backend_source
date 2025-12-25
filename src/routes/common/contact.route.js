const express = require('express');
const router = express.Router();
const contactControllers = require('../../controllers/contact.controller');

router.post('/send-contact', contactControllers.sendContact);

module.exports = router;
