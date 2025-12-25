const { TEMPLATE } = require('../constants/template.constant');
const db = require('../models/index.model');
const { sendMail } = require('../utils/email.util');
const { handleSuccess } = require('../utils/handleResponse.util');
const dayjs = require('dayjs');

// SEND CONTACT
const sendContact = async (data) => {
  try {
    await db.tb_contact.create(data);
    const dataSuport = {
      ...data,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    // Send from support team
    await sendMail(TEMPLATE.CONTACT, dataSuport, process.env.MAIL_USER, `Contact Pione Dream 2025`);

    // Response user
    await sendMail(
      TEMPLATE.AUTOREPLY,
      { name: data.name },
      data.email,
    );
    return handleSuccess(null, 'Send contact successfuly !');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  sendContact,
};
