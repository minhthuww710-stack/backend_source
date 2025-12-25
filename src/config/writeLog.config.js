const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const moment = require('moment');

const configWriteLog = (app) => {
  const logsDir = path.join(__dirname.replace('config', 'logs'));
  const today = moment().format('DD_MM_YYYY');
  const logFileName = `log_${today}.log`;
  const pathLog = path.join(logsDir, logFileName);
  const accessLogStream = fs.createWriteStream(pathLog, { flags: 'a' });
  if (app.get('env') === 'production') {
    app.use(
      morgan('combined', {
        skip: (req, res) => res.status < 400,
        stream: accessLogStream,
      })
    );
  } else {
    app.use(morgan('combined', { stream: accessLogStream }));
  }
};

module.exports = {
  configWriteLog,
};
