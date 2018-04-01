'use strict';

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const payloadSchemaLeague = Joi.object({
  name: Joi.string(),
  packagename: Joi.string(),
  enable: Joi.boolean(),
  index: Joi.string()
});

const paramsSchemaLeague = Joi.object({
  id: Joi.objectId().required()
});

module.exports = {
  payloadSchemaLeague: payloadSchemaLeague,
  paramsSchemaLeague: paramsSchemaLeague
};
