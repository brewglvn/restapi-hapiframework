'use strict';

const Boom = require('boom');
const League = require('../model/League');

function verifyUniqueLeague(req, res) { 
  League.findOne(
    {
      $or: [{ name: req.payload.name }]
    },
    (err, league) => {
      // Check whether the username
      // is already taken and error out if so
      if (league) {
        if (league.name === req.payload.name) {
          res(Boom.badRequest('League name taken'));
          return;
        }

        //if (league.index === req.payload.index) {
          //res(Boom.badRequest('League index taken'));
          //eturn;
        //}
      }
      
      res(req.payload);
    }
  );
}

module.exports = {
  verifyUniqueLeague: verifyUniqueLeague
};
