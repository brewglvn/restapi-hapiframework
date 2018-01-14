'use strict';

const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().required(),
  adminkey: Joi.string().required()
});

module.exports = createUserSchema;
