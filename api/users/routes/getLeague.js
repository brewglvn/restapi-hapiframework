'use strict';

const League = require('../model/League');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/league',
  config: {
    handler: (req, res) => {
      League.find()
        // Deselect the password and version fields
        .select('-__v -_id')
        .exec((err, league) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          if (!league.length) {
            res(Boom.notFound('No league found!'));
            return;
          }
          res(league);
        });
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin', 'user']
    }
  }
};
