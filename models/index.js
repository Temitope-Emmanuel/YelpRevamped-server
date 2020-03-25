const mongoose =  require("mongoose")
mongoose.set("debug",true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/yelpcampv8",{
    keepAlive:true,
    useUnifiedTopology:true,
    useNewUrlParser:true
})



module.exports.User = require("./User")
module.exports.Campground = require("./Campground")
