const express = require('express');
const router = express.Router();
const notificationControllers = require('../../controllers/notification.controller');

router.get('/get-list', notificationControllers.getNotificationAdmin);

router.post('/create', notificationControllers.createNotification);
router.put('/update/:id', notificationControllers.updateNotification);
router.delete('/delete/:id', notificationControllers.deleteNotification);

// SEND MAIL
router.get('/email/filter', notificationControllers.getEmailFilter);
router.get('/email/template', notificationControllers.getEmailTemplate);
router.post('/email/create-template', notificationControllers.createEmailTemplate);
router.post('/email/send-continue/:id', notificationControllers.sendEmailContinue);
router.post('/email/send-detail/:logid', notificationControllers.sendEmailTemplate);
router.delete('/email/template/:id', notificationControllers.deleteEmailTemplate);

module.exports = router;
