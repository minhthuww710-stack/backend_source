const db = require('../models/index.model');
const { compareBcrypt, hashBcrypt } = require('../utils/common.ulti');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { createTokenAdmin, createTokenUser } = require('../utils/jwt.util');
const { getLocationByIP } = require('./geolocation.service');

//----------------------------------ADMIN-------------------------------------
// LOGIN ADMIN
const loginAdmin = async ({ username, password, userAgent, clientIP }) => {
  try {
    const user = await db.tb_admin.findOne({
      where: {
        username,
        status: true,
      },
    });
    if (!user || !(await compareBcrypt(user.password, password)))
      return handleFailed('Account name or password is incorrect!');

    // save ip address
    const location = await getLocationByIP({ ip: clientIP });
    await db.tb_history_login_admin.create({
      admin_id: user.id,
      user_agent: userAgent,
      ip: clientIP,
      country_name: location.country_name,
      region_name: location.region_name,
      city_name: location.city_name,
      latitude: location.latitude,
      longitude: location.longitude,
      zip_code: location.zip_code,
      as: location.as,
    });

    const dataToken = {
      userid: user.id,
      username: user.username,
      email: user.email,
      status: user.status,
      role: 'ADMIN',
    };
    const token = createTokenAdmin(dataToken);
    delete user.dataValues.password;
    return handleSuccess({ token, user }, 'Login success!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// CHANGE PASSWORD ADMIN
const changePasswordAdmin = async ({ userid, password, newPassword }) => {
  try {
    const user = await db.tb_admin.findByPk(userid);
    if (!user || !(await compareBcrypt(user.password, password)))
      return handleFailed('Admin invalid!');
    if (await compareBcrypt(user.password, newPassword))
      return handleFailed('The new password must be different from the old password!');
    const hashPassword = await hashBcrypt(newPassword);
    user.password = hashPassword;
    await user.save();
    return handleSuccess(null, 'Change password success!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// HISTORY LOGIN
const historyLogin = async (userid) => {
  try {
    const user = await db.tb_admin.findByPk(userid);
    if (!user) return handleFailed('Admin invalid!');
    const history = await db.tb_history_login_admin.findAll({
      where: {
        admin_id: userid,
      },
      order: [['id', 'DESC']],
    });
    return handleSuccess(history, 'Change password success!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// LOGIN USER
const loginUser = async ({ wallet }) => {
  try {
    let dataToken;
    const user = await db.tb_user.findOne({
      where: {
        wallet,
        active: true,
      },
    });
    if (!user) {
      const createUser = await db.tb_user.create({ wallet });
      dataToken = {
        userid: createUser.id,
        wallet,
      };
    } else {
      dataToken = {
        userid: user.id,
        wallet,
        role: user?.role || null,
      };
    }
    const token = createTokenUser(dataToken);
    return handleSuccess({ token, wallet }, 'Login success!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  loginAdmin,
  loginUser,
  changePasswordAdmin,
  historyLogin,
};
