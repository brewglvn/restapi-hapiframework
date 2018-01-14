'use strict';

const Boom = require('boom');
const User = require('../model/User');
const deleteUserSchema = require('../schemas/deleteUser');

module.exports = {
    method: 'POST',
    path: '/api/users/del/{id}',
    config: {
      handler: (req, res) => {
        const id = req.params.id;
        
        User.findOneAndRemove({ id: id }, (err, user) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          if (!user) {
            res(Boom.notFound('User not found!'));
            return;
          }
          res({ statusCode: '200', message: 'User removed!' });
        });
      },
      validate: {
        params: deleteUserSchema.paramsSchema
      },
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      }
    }
  };