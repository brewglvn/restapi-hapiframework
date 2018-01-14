'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const payloadSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30),
  admin: Joi.boolean()
});

const paramsSchema = Joi.object({
  id: Joi.objectId().required()
});

module.exports = {
  payloadSchema: payloadSchema,
  paramsSchema: paramsSchema
};
