'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueModel = new Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true, index: { unique: true } },
  name: { type: String, required: true},
  index: { type: String, required: true },
});

module.exports = mongoose.model('League', leagueModel);
