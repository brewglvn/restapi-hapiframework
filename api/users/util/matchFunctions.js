'use strict';

const Boom = require('boom');
const Match = require('../model/Match');

function verifyUniqueMatch(req, res) {
    res(req.payload);
}

module.exports = {
    verifyUniqueMatch: verifyUniqueMatch
};
