const Joi = require('joi');

// REGISTER TEAM SCHEMA
const registerTeamSchema = Joi.object({
  team_name: Joi.string().required().messages({
    'string.empty': 'Team name is required.',
    'any.required': 'Team name field cannot be empty.',
  }),
  school_name: Joi.string().required().messages({
    'string.empty': 'School name is required.',
    'any.required': 'School name field cannot be empty.',
  }),
  faculty_major: Joi.string().required().messages({
    'string.empty': 'Faculty major is required.',
    'any.required': 'Faculty major field cannot be empty.',
  }),
  topic_id: Joi.number().required().messages({
    'number.empty': 'Topic id is required.',
    'any.required': 'Topic id field cannot be empty.',
  }),
  leader_name: Joi.string().required().messages({
    'string.empty': 'Leader name is required.',
    'any.required': 'Leader name field cannot be empty.',
  }),
  phone_number: Joi.string()
    .required()
    .pattern(/^0[0-9]{9}$/)
    .messages({
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number field cannot be empty.',
      'string.pattern.base':
        'Invalid phone number. Please enter in correct format (10 digits starting with 0).',
    }),
  email: Joi.string().required().email().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
    'any.required': 'Email field cannot be empty.',
  }),
  student_code: Joi.string().required().messages({
    'string.empty': 'Student code is required.',
    'any.required': 'Student code field cannot be empty.',
  }),
  instructor: Joi.string().optional().messages({
    'string.empty': 'Instructor is required.',
    'any.required': 'Instructor field cannot be empty.',
  }),
  hash: Joi.string().required().messages({
    'string.empty': 'Hash is required.',
    'any.required': 'Hash field cannot be empty.',
  }),
  member: Joi.array()
    .items(
      Joi.object({
        member_name: Joi.string().required().messages({
          'string.empty': 'Member name is required.',
          'any.required': 'Member name cannot be empty.',
        }),
        email: Joi.string().email().required().messages({
          'string.empty': 'Email is required.',
          'string.email': 'Email must be a valid email address.',
          'any.required': 'Email cannot be empty.',
        }),
        phone_number: Joi.string()
          .required()
          .pattern(/^0[0-9]{9}$/)
          .messages({
            'string.empty': 'Phone number is required.',
            'any.required': 'Phone number field cannot be empty.',
            'string.pattern.base':
              'Invalid phone number. Please enter in correct format (10 digits starting with 0).',
          }),
        student_code: Joi.string().required().messages({
          'string.empty': 'Student code is required.',
          'any.required': 'Student code field cannot be empty.',
        }),
        wallet: Joi.string().required().messages({
          'string.empty': 'Wallet is required.',
          'any.required': 'Wallet field cannot be empty.',
        }),
      })
    )
    .min(2)
    .max(4)
    .required()
    .messages({
      'array.base': 'Member must be an array.',
      'any.required': 'Member field is required.',
    }),
});

// SUBMIT PRELIMINARY SCHEMA
const submitPreliminarySchema = Joi.object({
  team_name: Joi.string().required().messages({
    'string.empty': 'Team name is required.',
    'any.required': 'Team name field cannot be empty.',
  }),
  team_leader: Joi.string().required().messages({
    'string.empty': 'Team leader is required.',
    'any.required': 'Team leader field cannot be empty.',
  }),
  phone_number: Joi.string()
    .required()
    .pattern(/^0[0-9]{9}$/)
    .messages({
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number field cannot be empty.',
      'string.pattern.base':
        'Invalid phone number. Please enter in correct format (10 digits starting with 0).',
    }),
  email: Joi.string().required().email().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
    'any.required': 'Email field cannot be empty.',
  }),
  topic_id: Joi.number().required().messages({
    'string.empty': 'Topic id is required.',
    'any.required': 'Topic id field cannot be empty.',
  }),
  github_url: Joi.string().required().uri().messages({
    'string.empty': 'Github url is required.',
    'any.required': 'Github url field cannot be empty.',
    'string.uri': 'Invalid github url. Please enter a valid link ',
  }),
  demo_url: Joi.string().required().uri().messages({
    'string.empty': 'Demo url is required.',
    'any.required': 'Demo url field cannot be empty.',
    'string.uri': 'Invalid demo url. Please enter a valid link ',
  }),
  video_url: Joi.string().required().uri().messages({
    'string.empty': 'Video url is required.',
    'any.required': 'Video url field cannot be empty.',
    'string.uri': 'Invalid video url. Please enter a valid link ',
  }),
  self_evaluation: Joi.string().required().uri().messages({
    'string.empty': 'Self evaluation is required.',
    'any.required': 'Self evaluation field cannot be empty.',
    'string.uri': 'Invalid self evaluation. Please enter a valid link ',
  }),
  pitch_deck_url: Joi.string().required().uri().messages({
    'string.empty': 'Pitch desk url is required.',
    'any.required': 'Pitch desk url field cannot be empty.',
    'string.uri': 'Invalid pitch desk url. Please enter a valid link ',
  }),
  document_url: Joi.string().optional().uri().messages({
    'any.required': 'Document url field cannot be empty.',
    'string.uri': 'Invalid document url. Please enter a valid link ',
  }),
});

// UPDATE TOPIC SCHEMA
const updateTopicSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  problem: Joi.string().optional(),
  solution: Joi.string().optional(),
  link_demo: Joi.string().optional(),
  active: Joi.boolean().optional(),
  name_en: Joi.string().optional(),
  description_en: Joi.string().optional(),
  problem_en: Joi.string().optional(),
  solution_en: Joi.string().optional(),
});

// UPDATE TOPIC SCHEMA
const updateTimelineSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  start_time: Joi.date().iso().optional(),
  end_time: Joi.date().iso().optional(),
  expected_time: Joi.boolean().optional(),
  title_en: Joi.string().optional(),
  description_en: Joi.string().optional(),
});

// REGISTRATION DEADLINE SCHEMA
const registrationDeadlineSchema = Joi.object({
  end_time: Joi.date().iso().greater('now').required().messages({
    'date.base': 'End time must be a valid date',
    'date.greater': 'End time must be greater than the current time',
    'any.required': 'End time is required',
  }),
});

// REGISTER TEAM SCHEMA
const updateTeamSchema = Joi.object({
  team_name: Joi.string().required().messages({
    'string.empty': 'Team name is required.',
    'any.required': 'Team name field cannot be empty.',
  }),
  school_name: Joi.string().required().messages({
    'string.empty': 'School name is required.',
    'any.required': 'School name field cannot be empty.',
  }),
  faculty_major: Joi.string().required().messages({
    'string.empty': 'Faculty major is required.',
    'any.required': 'Faculty major field cannot be empty.',
  }),
  topic_id: Joi.number().required().messages({
    'number.empty': 'Topic id is required.',
    'any.required': 'Topic id field cannot be empty.',
  }),
  leader_name: Joi.string().required().messages({
    'string.empty': 'Leader name is required.',
    'any.required': 'Leader name field cannot be empty.',
  }),
  phone_number: Joi.string()
    .required()
    .pattern(/^0[0-9]{9}$/)
    .messages({
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number field cannot be empty.',
      'string.pattern.base':
        'Invalid phone number. Please enter in correct format (10 digits starting with 0).',
    }),
  email: Joi.string().required().email().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Invalid email format.',
    'any.required': 'Email field cannot be empty.',
  }),
  student_code: Joi.string().required().messages({
    'string.empty': 'Student code is required.',
    'any.required': 'Student code field cannot be empty.',
  }),
  instructor: Joi.string().optional().messages({
    'string.empty': 'Instructor is required.',
    'any.required': 'Instructor field cannot be empty.',
  }),
  hash: Joi.string().required().messages({
    'string.empty': 'Hash is required.',
    'any.required': 'Hash field cannot be empty.',
  }),
  members: Joi.array()
    .items(
      Joi.object({
        member_name: Joi.string().required().messages({
          'string.empty': 'Member name is required.',
          'any.required': 'Member name cannot be empty.',
        }),
        email: Joi.string().email().required().messages({
          'string.empty': 'Email is required.',
          'string.email': 'Email must be a valid email address.',
          'any.required': 'Email cannot be empty.',
        }),
        phone_number: Joi.string()
          .required()
          .pattern(/^0[0-9]{9}$/)
          .messages({
            'string.empty': 'Phone number is required.',
            'any.required': 'Phone number field cannot be empty.',
            'string.pattern.base':
              'Invalid phone number. Please enter in correct format (10 digits starting with 0).',
          }),
        student_code: Joi.string().required().messages({
          'string.empty': 'Student code is required.',
          'any.required': 'Student code field cannot be empty.',
        }),
        address_wallet: Joi.string().required().messages({
          'string.empty': 'Address wallet is required.',
          'any.required': 'Address wallet field cannot be empty.',
        }),
      })
    )
    .min(2)
    .max(4)
    .required()
    .messages({
      'array.base': 'Member must be an array.',
      'any.required': 'Member field is required.',
    }),
});
module.exports = {
  registerTeamSchema,
  registrationDeadlineSchema,
  submitPreliminarySchema,
  updateTopicSchema,
  updateTimelineSchema,
  updateTeamSchema,
};
