'use strict';

const Joi = require('joi');

const createLeagueSchema = Joi.object({
    name: Joi.string().required(),
    index: Joi.string().required()
});

module.exports = createLeagueSchema;
