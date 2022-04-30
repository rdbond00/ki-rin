const { Schema, model} = require('mongoose');
const mongoose = require('mongoose');
const Int32 = require("mongoose-int32").loadType(mongoose);


const reqString = {
    type: String,
    required: true
}

module.exports = model("twitchredeem", new Schema({
    id:reqString,
    title:reqString,
    cost: Int32,
    prompt:String,
    is_user_input_required:Boolean
}))