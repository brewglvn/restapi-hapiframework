'use strict';

const Joi = require('joi');

const createLeagueSchema = Joi.object({
    name: Joi.string().required(),
    packagename: Joi.string().required(),
    enable: Joi.boolean().required(),
    index: Joi.string().required()
});

module.exports = createLeagueSchema;
