'use strict';

const Boom = require('boom');
const User = require('../model/User');
const updateUserSchema = require('../schemas/updateUser');
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;

module.exports = {
  method: 'POST',
  path: '/api/users/{id}',
  config: {
    pre: [{ method: verifyUniqueUser, assign: 'user' }],
    handler: (req, res) => {
      const id = req.params.id;
      
      User.findOneAndUpdate({ id: id }, req.pre.user, (err, user) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }
        if (!user) {
          res(Boom.notFound('User not found!'));
          return;
        }
        res({ statusCode: '200', message: 'User updated!' });
      });
    },
    validate: {
      payload: updateUserSchema.payloadSchema,
      params: updateUserSchema.paramsSchema
    },
    auth: {
      strategy: 'jwt',
      scope: ['admin']
    }
  }
};
