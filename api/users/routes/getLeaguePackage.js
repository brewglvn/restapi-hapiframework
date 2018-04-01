'use strict';

const League = require('../model/League');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/league/{packagename}',
  config: {
    handler: (req, res) => {
      const packagename = req.params.packagename;
      League.find({packagename : pack})
        // Deselect the password and version fields
        .select('-__v -_id -packagename')
        .exec((err, league) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          if (!league.length) {
            res(Boom.notFound('No league found!'));
            return;
          }
          res({
            "statusCode": "200",
            "success": "true",
            "packagename": pack,
            "data": league
          });
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
