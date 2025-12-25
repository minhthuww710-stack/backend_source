const db = require('../models/index.model');
const CronJob = require('cron').CronJob;
const dayjs = require('dayjs');
const { sendMail } = require('../utils/email.util');
const { TEMPLATE } = require('../constants/template.constant');
const { Op } = require('sequelize');

let isRunning = false;

const cronSendMailTemplate = new CronJob(
  '0 */1 * * *',
  async function () {
    if (isRunning) {
      console.log('Cron is running, skip this time');
      return;
    }
    isRunning = true;
    console.log('Cron send mail template is running 📩');
    try {
      const templateMail = await db.tb_email_template.findOne({
        where: {
          status: 'PENDING',
          send_at: { [Op.lte]: dayjs().toDate() },
        },
      });

      if (!templateMail) return;
      const data = await db.tb_email_log.findAll({
        where: { template_id: templateMail.id, status: false },
      });

      // sendmail
      let quantitySend = templateMail.quantity_send_success;
      for (const element of data) {
        const team = await db.tb_team.findByPk(element.team_id);
        const htmlContent = templateMail.content.replace(/{{team_name}}/g, team?.team_name);

        const response = await sendMail(
          TEMPLATE.EMAIL_NOTIFICATION,
          { content: htmlContent, title: templateMail.title },
          element.email,
          templateMail.subject
        );

        if (response) {
          element.status = true;
          await element.save();
          quantitySend++;
        }
      }
      templateMail.quantity_send_success = quantitySend;
      templateMail.status = 'SUCCESS';
      await templateMail.save();
    } catch (error) {
      console.log('Error send mail template: ', error);
    } finally {
      isRunning = false;
    }
  },
  null,
  true
);

setTimeout(() => {
  cronSendMailTemplate.start();
  if (cronSendMailTemplate.running) {
    cronSendMailTemplate.fireOnTick();
  }
}, 2000);

process.stdin.resume();
