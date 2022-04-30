const { Schema, model} = require('mongoose');
const mongoose = require('mongoose');
const Int32 = require("mongoose-int32").loadType(mongoose);


const reqString = {
    type: String,
    required: true
}

module.exports = model("modal", new Schema({
    guildId: reqString,
    channelId: reqString,
    messageId: reqString,
    customId:reqString,
    title:reqString,
    Initiated:Boolean,
    TextInputs: [{
        CustomId:reqString,
        Label:String,
        Style:reqString,
        MinLength:Number,
        MaxLength:Number,
        Placeholder:reqString,
        Required:Boolean,
    }],
    Responses: [{
        username: String,
        CustomId: String,
        response: String
    }]
}))