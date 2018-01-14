'use strict';

const Boom = require('boom');
const Match = require('../model/Match');
const deleteMatchSchema = require('../schemas/deleteMatch');

module.exports = {
    method: 'POST',
    path: '/api/matches/del/{id}',
    config: {
      handler: (req, res) => {
        const id = req.params.id;
        
        Match.findOneAndRemove({ id: id }, (err, match) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          if (!match) {
            res(Boom.notFound('Match not found!'));
            return;
          }
          res({ statusCode: '200', message: 'Match removed!' });
        });
      },
      validate: {
        params: deleteMatchSchema.paramsSchema
      },
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    }
  };