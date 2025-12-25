const { notFount } = require('../utils/handleResponse.util');
const adminRoutes = require('./admin/index.route');
const userRoutes = require('./user/index.route');
const commonRoutes = require('./common/index.route');

const initRoutes = (app) => {
  app.use('/api/v1/admin', adminRoutes);
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/common', commonRoutes);

  return app.use('/', notFount);
};

module.exports = initRoutes;
