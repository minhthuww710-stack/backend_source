const { Op } = require('sequelize');
const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { createSlug } = require('../utils/common.ulti');
const { formatImagePath } = require('./image.service');
const path = require('path');
const fs = require('fs');
const { FILTER_SEND_EMAIL, TEMPLATE } = require('../constants/template.constant');
const _ = require('lodash');
const dayjs = require('dayjs');

//----------------------------------ADMIN-------------------------------------
// GET NOTIFICATION ADMIN
const getNotificationAdmin = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_notification.findAndCountAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${keyword}%` } }],
      },
      offset: Number(offset),
      limit: Number(limit),
      order: [['id', 'DESC']],
    });
    for (const element of response.rows) {
      element.image_url = formatImagePath(element.image_url);
    }
    return handleSuccess(response, 'Get notification successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// CREATE NEW NOTIFICATION
const createNotification = async (data) => {
  try {
    const slug = createSlug(data.title);
    await db.tb_notification.create({
      slug,
      ...data,
    });
    return handleSuccess(null, 'Create new notification successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// UPDATE NOTIFICATION
const updateNotification = async ({ id, ...data }) => {
  try {
    const response = await db.tb_notification.findByPk(id);
    if (!response) return handleFailed('Not found!');

    if (data?.title) {
      data.slug = createSlug(data.title);
    }
    await db.tb_notification.update({ ...data }, { where: { id } });
    return handleSuccess(null, 'Update notification successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DELETE NOTIFICATION
const deleteNotification = async (id) => {
  try {
    const response = await db.tb_notification.findByPk(id);
    if (!response) return handleFailed('Not found!');

    // delete image
    const imagePath = path.join(__dirname, '../images', response.image_url);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await db.tb_notification.destroy({ where: { id } });
    return handleSuccess(null, 'Delete notification successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET EMAIL FILTER
const getEmailFilter = async () => {
  try {
    const response = FILTER_SEND_EMAIL;
    return handleSuccess(response, 'Get email filter successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET EMAIL TEMPLATE
const getEmailTemplate = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_email_template.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${keyword}%` } },
          { subject: { [Op.like]: `%${keyword}%` } },
        ],
      },
      attributes: { exclude: ['content'] },
      offset: Number(offset),
      limit: Number(limit),
      order: [['id', 'DESC']],
    });
    return handleSuccess(response, 'Get email filter successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// CREATE TEMPLATE EMAIL
const createEmailTemplate = async ({ type_filter, email = '', ...data }) => {
  try {
    const response = await filterRecipient(type_filter, email);

    const createTemplate = await db.tb_email_template.create({
      ...data,
      type_filter,
      quantity_send: response.length,
    });

    for (const element of response) {
      await db.tb_email_log.create({
        template_id: createTemplate.id,
        team_id: element.team_id,
        userid: element.userid,
        name: element.name,
        email: element.email,
        send_at: data.send_at,
      });
    }
    return handleSuccess(null, 'Create template email successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// FILTER RECIPIENT
const filterRecipient = async (type_filter, email = '') => {
  try {
    let response = [];
    let where = { active: true };
    switch (type_filter) {
      case 'SEMIFINAL':
        where.semifinal = true;
        break;
      case 'FINAL':
        where.semifinal = true;
        where.final = true;
        break;
      case 'NOT_SEMIFINAL':
        where.semifinal = false;
        break;
      case 'NOT_FINAL':
        where.final = false;
        break;
      case 'CUSTOM':
        if (!email) return null;
        return [
          {
            team_id: 0,
            userid: 0,
            name: 'No name',
            email,
          },
        ];
      case 'ALL':
      default:
        break;
    }

    const data = await db.tb_team.findAll({
      where,
      include: [
        {
          model: db.tb_team_member,
          as: 'members',
        },
      ],
    });

    data.forEach((element) => {
      // leader
      response.push({
        team_id: element.id,
        userid: element.userid,
        name: element.leader_name,
        email: element.email,
      });

      // members
      const members = _.map(element.members, (m) => ({
        team_id: element.id,
        userid: m.userid,
        name: m.member_name,
        email: m.email,
      }));

      response.push(...members);
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// CREATE TEMPLATE EMAIL
const sendEmailTemplate = async (id) => {
  try {
    const emailLog = await db.tb_email_log.findByPk(id);
    const templateMail = await db.tb_email_template.findByPk(emailLog.template_id);

    const htmlContent = templateMail.content.replace(/{{team_name}}/g, team?.team_name);
    const response = await sendMail(
      TEMPLATE.EMAIL_NOTIFICATION,
      { content: htmlContent, title: templateMail.title },
      emailLog.email,
      templateMail.subject
    );

    if (response) {
      emailLog.status = true;
      await emailLog.save();
    }

    return handleSuccess(null, 'Send email successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// CREATE TEMPLATE EMAIL
const sendEmailContinue = async (id) => {
  try {
    const emailLog = await db.tb_email_log.findByPk(id);
    const templateMail = await db.tb_email_template.findByPk(emailLog.template_id);

    const htmlContent = templateMail.content.replace(/{{team_name}}/g, team?.team_name);
    const response = await sendMail(
      TEMPLATE.EMAIL_NOTIFICATION,
      { content: htmlContent, title: templateMail.title },
      emailLog.email,
      templateMail.subject
    );

    if (response) {
      emailLog.status = true;
      await emailLog.save();
    }

    return handleSuccess(null, 'Send email successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DELETE TEMPLATE EMAIL
const deleteEmailTemplate = async (id) => {
  try {
    const template = await db.tb_email_template.findOne({
      where: {
        id,
        quantity_send_success: { [Op.gte]: 0 },
        send_at: { [Op.gte]: dayjs().toDate() },
      },
    });

    if (!template) return handleFailed('Template mail was sent or not found!');

    // delete template
    await template.destroy();
    await db.tb_email_log.destroy({ where: { template_id: template.id } });
    return handleSuccess(null, 'Delete email successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------USER-------------------------------------
// GET LIST NOTIFICATION
const getNotification = async ({ page = 1, limit = 10 }) => {
  try {
    let offset = (page - 1) * limit;
    const response = await db.tb_notification.findAndCountAll({
      where: { active: true },
      offset: Number(offset),
      limit: Number(limit),
      order: [['id', 'DESC']],
    });
    for (const element of response.rows) {
      element.image_url = formatImagePath(element.image_url);
    }
    return handleSuccess(response, 'Get notification successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getNotification,
  getNotificationAdmin,
  getEmailFilter,
  getEmailTemplate,
  createNotification,
  createEmailTemplate,
  updateNotification,
  deleteNotification,
  deleteEmailTemplate,
  sendEmailTemplate,
  sendEmailContinue,
};
