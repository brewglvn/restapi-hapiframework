'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchModel = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true, index: { unique: true } },
    title:{ type: String, required: true},
    thumb:{type: String , required: true},
    link:{type: String , required: true},
    new:{type: Boolean , required: true},
    compe:{type: String , required: true},
    date:{type: String , required: true},
    infor:{type: String , required: true},
    index:{type: String , required: true}
});

module.exports = mongoose.model('Match', matchModel);