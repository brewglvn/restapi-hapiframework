'use strict';

const Boom = require('boom');
const League = require('../model/League');
const deleteLeagueSchema = require('../schemas/deleteLeague');

module.exports = {
    method: 'POST',
    path: '/api/league/del/{id}',
    config: {
      handler: (req, res) => {
        const id = req.params.id;
        
        League.findOneAndRemove({ id: id }, (err, league) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          if (!league) {
            res(Boom.notFound('League not found!'));
            return;
          }
          res({ statusCode: '200', message: 'League removed!' });
        });
      },
      validate: {
        params: deleteLeagueSchema.paramsSchema
      },
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    }
  };