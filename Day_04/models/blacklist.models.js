const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    access_token:{
        type:String
    }
},{versionKey:false})

const BlacklistModel = mongoose.model("Blacklist",blacklistSchema)

module.exports =BlacklistModel