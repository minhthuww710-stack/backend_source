const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

exports.sendMail = (template, dataMail, email, subject) =>
  new Promise(async (resolve, reject) => {
    try {
      const emailTemplate = fs.readFileSync(
        path.join(__dirname, '..', 'templates', `${template}.template.html`),
        'utf8'
      );
      const compiledTemplate = handlebars.compile(emailTemplate);
      const body = compiledTemplate(dataMail);
      // CONFIG
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
      //  MAIL OPTION
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        html: body,
      };

      // SEND MAIL
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Lỗi khi gửi email:', error);
          return reject(null);
        } else {
          console.log("Email đã được gửi thành công:", info.response);
          return resolve(true);
        }
      });
    } catch (error) {
      console.log(error);
      reject(null);
    }
  });
