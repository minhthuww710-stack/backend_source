const TEMPLATE = {
  CONTACT: 'contact',
  AUTOREPLY: 'autoReply',
  SUBMIT_PRELIMINARY: 'submitPreliminary',
  REGISTER: 'register',
  EMAIL_NOTIFICATION: 'emailNotification',

  // send mail manage
  MANAGE_REGISTER: 'manageRegister',
};

const FILTER_SEND_EMAIL = [
  { name: 'ALL', description: 'Gửi cho tất cả' },
  { name: 'SEMIFINAL', description: 'Đội vào Bán kết' },
  { name: 'FINAL', description: 'Đội vào Chung kết' },
  { name: 'NOT_SEMIFINAL', description: 'Đội không vào Bán kết' },
  { name: 'NOT_FINAL', description: 'Đội không vào Chung kết' },
  { name: 'CUSTOM', description: 'Tuỳ chỉnh' },
];

module.exports = {
  TEMPLATE,
  FILTER_SEND_EMAIL,
};
