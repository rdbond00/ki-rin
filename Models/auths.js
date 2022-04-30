const { Schema, model} = require('mongoose');
const mongoose = require('mongoose');
const Int32 = require("mongoose-int32").loadType(mongoose);


const reqString = {
    type: String,
    required: true
}

module.exports = model("auth", new Schema({
    client_id: reqString,
    client_secret: reqString,
    access_token: reqString,
    refresh_token: reqString,
    expires_in: Int32
}))