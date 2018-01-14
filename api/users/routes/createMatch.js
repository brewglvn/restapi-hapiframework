'use strict';

const Boom = require('boom');
const Match = require('../model/Match');
const createMatchSchema = require('../schemas/createMatch');
const verifyUniqueMatch = require('../util/matchFunctions').verifyUniqueMatch;

module.exports = {
    method: 'POST',
    path: '/api/matches',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        pre: [{ method: verifyUniqueMatch }], // check something exist
        handler: (req, res) => {
            let match = new Match();
            match.title = req.payload.title;
            match.thumb = req.payload.thumb;
            match.link = req.payload.link;
            match.new = req.payload.new;
            match.compe = req.payload.compe;
            match.date = req.payload.date;
            match.infor = req.payload.infor;
            match.index = req.payload.index;
            match.save((err, match) => {
                if (err) {
                    res(Boom.badRequest(err));
                    return;
                }
                res({ statusCode: '200', success:'true' });
            });
        },
        validate: {
            payload: createMatchSchema
        }
    }
};