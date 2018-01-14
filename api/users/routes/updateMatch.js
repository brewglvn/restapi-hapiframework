'use strict';

const Boom = require('boom');
const Match = require('../model/Match');
const updateMatchSchema = require('../schemas/updateMatch');
const verifyUniqueMatch = require('../util/matchFunctions').verifyUniqueMatch;

module.exports = {
  method: 'POST',
  path: '/api/matches/{id}',
  config: {
    pre: [{ method: verifyUniqueMatch, assign: 'match' }],
    handler: (req, res) => {
      const id = req.params.id;
      
      Match.findOneAndUpdate({ id: id }, req.pre.match, (err, match) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }
        if (!match) {
          res(Boom.notFound('Math not found!'));
          return;
        }
        res({ statusCode: '200', message: 'Match updated!' });
      });
    },
    validate: {
      payload: updateMatchSchema.payloadSchemaMatch,
      params: updateMatchSchema.paramsSchemaMatch
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
};
