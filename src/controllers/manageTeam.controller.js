const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const manageTeamServices = require('../services/manageTeam.service');
const fs = require('fs');
const path = require('path');
const {
  listUserSchema,
  updateTeamSchema,
  listTeamSchema,
  setFinalSchema,
} = require('../validations/manageTeam.validation');

// LIST TEAM
const listTeam = async (req, res) => {
  try {
    const { error, value } = listTeamSchema.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await manageTeamServices.listTeam(value);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// LIST USER
const listUser = async (req, res) => {
  try {
    const { error } = listUserSchema.validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await manageTeamServices.listUser(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// DETAIL TEAM
const detailTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await manageTeamServices.detailTeam(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// DETAIL TEAM CONTRACT
const detailTeamContract = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await manageTeamServices.detailTeamContract(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// UPDATE TEAM
const updateTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = updateTeamSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await manageTeamServices.updateTeam({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// EXPORT EXCEL
const exportExcel = async (req, res) => {
  try {
    const response = await manageTeamServices.exportExcel();
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(response)}"`);
    res.sendFile(response, () => {
      fs.unlink(response, () => {});
    });
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// EXPORT EXCEL PRELIMINARY
const exportExcelPreliminary = async (req, res) => {
  try {
    const response = await manageTeamServices.exportExcelPreliminary();
    res.setHeader('Content-Disposition', `attachment; filename="${path.basename(response)}"`);
    res.sendFile(response, () => {
      fs.unlink(response, () => {});
    });
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// SET FINAL TEAM
const setFinal = async (req, res) => {
  try {
    const { error } = setFinalSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await manageTeamServices.setFinal(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// LIST CONTEST PRELIMINARY
const listPreliminary = async (req, res) => {
  try {
    const response = await manageTeamServices.listPreliminary(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// LIST CONTEST SEMIFINAL
const listSemifinal = async (req, res) => {
  try {
    const response = await manageTeamServices.listSemifinal(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  listTeam,
  listUser,
  listPreliminary,
  listSemifinal,
  detailTeam,
  detailTeamContract,
  exportExcel,
  exportExcelPreliminary,
  setFinal,
  updateTeam,
};
