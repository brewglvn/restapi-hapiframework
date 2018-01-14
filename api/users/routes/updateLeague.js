'use strict';

const Boom = require('boom');
const League = require('../model/League');
const updateLeagueSchema = require('../schemas/updateLeague');
const verifyUniqueLeague = require('../util/leagueFunctions').verifyUniqueLeague;

module.exports = {
  method: 'POST',
  path: '/api/league/{id}',
  config: {
    pre: [{ method: verifyUniqueLeague, assign: 'league' }],
    handler: (req, res) => {
      const id = req.params.id;
      
      League.findOneAndUpdate({ id: id }, req.pre.league, (err, league) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }
        if (!league) {
          res(Boom.notFound('League not found!'));
          return;
        }
        res({ statusCode: '200', message: 'League updated!' });
      });
    },
    validate: {
      payload: updateLeagueSchema.payloadSchemaLeague,
      params: updateLeagueSchema.paramsSchemaLeague
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
};
