const Joi = require('joi');

const listTeamSchema = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  keyword: Joi.string().optional().allow(''),
  topic_id: Joi.number().optional().min(1).max(5),
  active: Joi.boolean().optional().truthy('true').falsy('false'),
});

const listUserSchema = Joi.object({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
  keyword: Joi.string().optional().allow(''),
  role: Joi.string().optional().valid('LEADER', 'MEMBER'),
});

const updateTeamSchema = Joi.object({
  team_name: Joi.string().optional(),
  school_name: Joi.string().optional(),
  faculty_major: Joi.string().optional(),
  topic_id: Joi.number().optional(),
  leader_name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  email: Joi.string().email().optional(),
  student_code: Joi.string().optional(),
  instructor: Joi.string().optional(),
  hash: Joi.string().optional(),
  active: Joi.boolean().optional(),
  members: Joi.array().optional(),
});

const setFinalSchema = Joi.object({
  teams: Joi.array().items(Joi.number()).required(),
});

module.exports = {
  listUserSchema,
  listTeamSchema,
  updateTeamSchema,
  setFinalSchema,
};
