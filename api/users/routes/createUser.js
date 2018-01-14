'use strict';

const bcrypt = require('bcryptjs');
const Boom = require('boom');
const User = require('../model/User');
const createUserSchema = require('../schemas/createUser');
const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;
const createToken = require('../util/token');
const configs = require('../../../config');

function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}

module.exports = {
  method: 'POST',
  path: '/api/users',
  config: {
    auth: false,
    // Before the route handler runs, verify that the user is unique
    pre: [{ method: verifyUniqueUser }],
    handler: (req, res) => {
      let user = new User();
      user.username = req.payload.username;
      if (req.payload.username === configs.adminusername) {
        user.admin = true;
      } else {
        user.admin = false;
      }
      if(configs.adminkey !== req.payload.adminkey){
        res(Boom.badRequest('Wrong admin key'));
        return;
      }
      hashPassword(req.payload.password, (err, hash) => {
        if (err) {
          res(Boom.badRequest(err));
          return;
        }
        user.password = hash;
        user.save((err, user) => {
          if (err) {
            res(Boom.badRequest(err));
            return;
          }
          // If the user is saved successfully, issue a JWT
          //res({ id_token:'Bearer '+ createToken(user) }).code(201);
          res({ statusCode: '200', id_token:'Bearer '+ createToken(user) });
        });
      });
    },
    // Validate the payload against the Joi schema
    validate: {
      payload: createUserSchema
    }
  }
};
