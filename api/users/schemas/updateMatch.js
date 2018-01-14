'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const payloadSchemaMatch = Joi.object({
  title: Joi.string(),
  thumb: Joi.string(),
  link: Joi.string(),
  new: Joi.boolean(),
  compe: Joi.string(),
  date: Joi.string(),
  infor: Joi.string(),
  index: Joi.string()
});

const paramsSchemaMatch = Joi.object({
  id: Joi.objectId().required()
});

module.exports = {
  payloadSchemaMatch: payloadSchemaMatch,
  paramsSchemaMatch: paramsSchemaMatch
};
