const mongoose = require("mongoose")


const campgroundSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        unique:true
    }
})

const Campground = mongoose.model("Campground",campgroundSchema)
module.exports = Campground