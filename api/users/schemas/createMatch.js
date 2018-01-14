'use strict';

const Joi = require('joi');

const createMatchSchema = Joi.object({
    title: Joi.string().required(),
    thumb: Joi.string().required(),
    link: Joi.string().required(),
    new: Joi.boolean().required(),
    compe: Joi.string().required(),
    date: Joi.string().required(),
    infor: Joi.string().required(),
    index: Joi.string().required()
});

module.exports = createMatchSchema;
