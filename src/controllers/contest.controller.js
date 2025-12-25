const { serverError, handleResponse, badRequest } = require('../utils/handleResponse.util');
const contestServices = require('../services/contest.service');
const {
  submitPreliminarySchema,
  registerTeamSchema,
  updateTopicSchema,
  updateTimelineSchema,
  registrationDeadlineSchema,
  updateTeamSchema,
} = require('../validations/contest.validation');

//----------------------------------ADMIN-------------------------------------
// GET TOPIC ADMIN
const getTopicAdmin = async (req, res) => {
  try {
    const response = await contestServices.getTopicAdmin();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// GET TIMELINE ADMIN
const getTimelineAdmin = async (req, res) => {
  try {
    const response = await contestServices.getTimelineAdmin();
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// UPDATE TOPIC
const updateTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = updateTopicSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contestServices.updateTopic({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// UPDATE TIMELINE
const updateTimeline = async (req, res) => {
  try {
    const id = req.params.id;
    const { error } = updateTimelineSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contestServices.updateTimeline({ id, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// DELETE TIMELINE
const deleteTimeline = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await contestServices.deleteTimeline(id);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// UPDATE DEADLINE REGISTRATION
const registrationDeadline = async (req, res) => {
  try {
    const { error } = registrationDeadlineSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contestServices.registrationDeadline(req.body);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

//----------------------------------CLIENT-------------------------------------
// GET TOPIC
const getTopic = async (req, res) => {
  try {
    const response = await contestServices.getTopic(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// GET TIMELINE
const getTimeline = async (req, res) => {
  try {
    const response = await contestServices.getTimeline(req.query);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// REGISTER TEAM
const registerTeam = async (req, res) => {
  try {
    const userid = req.data.userid;
    const { error } = registerTeamSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contestServices.registerTeam({ userid, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// UPDATE TEAM
const updateTeam = async (req, res) => {
  try {
    const userid = req.data.userid;
    const { error } = updateTeamSchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contestServices.updateTeam({ userid, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// SUBMIT PRELIMINARY
const submitPreliminary = async (req, res) => {
  try {
    const userid = req.data.userid;
    const { error } = submitPreliminarySchema.validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await contestServices.submitPreliminary({ userid, ...req.body });
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

// GET MY TEAM
const myTeam = async (req, res) => {
  try {
    const userid = req.data.userid;
    const response = await contestServices.myTeam(userid);
    return handleResponse(res, response);
  } catch (error) {
    console.log(error);
    serverError(res, error, req.originalUrl);
  }
};

module.exports = {
  getTopic,
  getTopicAdmin,
  getTimeline,
  getTimelineAdmin,
  registerTeam,
  submitPreliminary,
  updateTopic,
  updateTimeline,
  updateTeam,
  registrationDeadline,
  deleteTimeline,
  myTeam,
};
