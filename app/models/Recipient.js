const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipientSchema = new Schema({
    email : String,
    responded : {type: Boolean, default: 0},
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    responseTime: Date
});

module.exports =  recipientSchema;