'use strict';

const Match = require('../model/Match');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/matches',
  config: {
    handler: (req, res) => {
      Match.find()
        // Deselect the password and version fields
        .select('-__v -_id')
        .exec((err, matches) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          if (!matches.length) {
            res(Boom.notFound('No matches found!'));
            return;
          }
          res({
            "statusCode": "200",
            "success": "true",
            "data": matches
          });
        });
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin','user']
    }
  }
};
