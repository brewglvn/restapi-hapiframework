'use strict';

const User = require('../model/User');
const Boom = require('boom');

module.exports = {
  method: 'GET',
  path: '/api/users',
  config: {
    handler: (req, res) => {
      User.find()
        // Deselect the password and version fields
        .select('-_id -password -__v')
        .exec((err, users) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          if (!users.length) {
            res(Boom.badRequest('No user found!'));
            return;
          }
          res({
            "statusCode": "200",
            "success": "true",
            "data": users
          });
        });
    },
    // Add authentication to this route
    // The user must have a scope of `admin`
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
};
