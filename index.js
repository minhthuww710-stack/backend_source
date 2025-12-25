const express = require('express');
const cors = require('cors');
const initRoutes = require('./src/routes/index.route');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { configWriteLog } = require('./src/config/writeLog.config');
require('dotenv').config();
require('./src/database/connect_db');
// CRONJOB
require('./src/cron/index.cron');

const app = express();

// WRITE LOG
configWriteLog(app);

// CONFIG CORS
const allowOrigins = JSON.parse(process.env.CLIENT_URL);
const skipCorsRoutes = (req, res, next) => {
  cors({
    origin: allowOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })(req, res, next);
};

app.use(skipCorsRoutes);
app.set('trust proxy', true);
app.use(helmet());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
});

app.use(limiter);

// CONFIG REQUEST DATA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTE
initRoutes(app);

// START SERVER
const PORT = process.env.PORT || 3000;

const listerner = app.listen(PORT, () => {
  console.log('Server is running on the port ' + listerner.address().port);
});
