'use strict';

const Boom = require('boom');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const config = require('../../../config');

function verifyUniqueUser(req, res) {
  // Find an entry from the database that
  // matches either the email or username
  User.findOne(
    {
      $or: [{ username: req.payload.username }]
    },
    (err, user) => {
      // Check whether the username
      // is already taken and error out if so
      if (user) {
        if (user.username === req.payload.username) {
          res(Boom.badRequest('Username taken'));
          return;
        }
      }
      
      res(req.payload);
    }
  );
}

function verifyCredentials(req, res) {
  const password = req.payload.password;

  // Find an entry from the database that
  // matches either the email or username
  User.findOne(
    {
      $or: [{ username: req.payload.username }]
    },
    (err, user) => {
      if (!user) {
        return res(Boom.badRequest('Incorrect username!'));
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
          return res(user);
        }
        return res(Boom.badRequest('Incorrect username!'));
      });
    }
  );
}

module.exports = {
  verifyUniqueUser: verifyUniqueUser,
  verifyCredentials: verifyCredentials
};
