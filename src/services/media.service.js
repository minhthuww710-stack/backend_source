const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { Op } = require('sequelize');

//----------------------------------ADMIN-------------------------------------
// ADMIN GET MEDIA
const adminGetMedia = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    const offset = (page - 1) * limit;
    const response = await db.tb_media.findAndCountAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
      },
      offset: Number(offset),
      limit: Number(limit),
    });
    return handleSuccess(response, 'Get list media successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN CREATE MEDIA
const adminCreateMedia = async (data) => {
  try {
    await db.tb_media.create(data);
    return handleSuccess(null, 'Create media successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN UPDATE MEDIA
const adminUpdateMedia = async ({ id, ...data }) => {
  try {
    const response = await db.tb_media.findByPk(id);
    if (!response) return handleFailed('Media not found!');

    await db.tb_media.update(data, { where: { id } });
    return handleSuccess(null, 'Update media successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ADMIN DESTROY MEDIA
const adminDestroyMedia = async (id) => {
  try {
    const response = await db.tb_media.findByPk(id);
    if (!response) return handleFailed('Media not found!');

    await response.destroy();
    return handleSuccess(null, 'Destroy media successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------COMMON-------------------------------------
// GET MEDIA
const getMedia = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    const offset = (page - 1) * limit;
    const response = await db.tb_media.findAndCountAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
        active: true,
      },
      offset: Number(offset),
      limit: Number(limit),
    });
    return handleSuccess(response, 'Get list media successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  adminGetMedia,
  adminCreateMedia,
  adminUpdateMedia,
  adminDestroyMedia,
  getMedia,
};
