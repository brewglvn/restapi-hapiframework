'use strict';

const Boom = require('boom');
const League = require('../model/League');
const createLeagueSchema = require('../schemas/createLeague');
const verifyUniqueLeague = require('../util/leagueFunctions').verifyUniqueLeague;

module.exports = {
    method: 'POST',
    path: '/api/league',
    config: {
        auth: {
            strategy: 'jwt',
            scope: ['admin']
        },
        pre: [{ method: verifyUniqueLeague }], // check something exist
        handler: (req, res) => {
            let league = new League();
            league.name = req.payload.name;
            league.packagename = req.payload.packagename;
            league.enable = req.payload.enable;
            league.index = req.payload.index;
            league.save((err, league) => {
                if (err) {
                    res(Boom.badRequest(err));
                    return;
                }
                res({ statusCode: '200', success:'true' });
            });
        },
        validate: {
            payload: createLeagueSchema
        }
    }
};