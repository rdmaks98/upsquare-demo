const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    picture:{
        type:String,
    },
    cloudinary_id:{
        type: String,
    },
});

module.exports = mongoose.model("Images",imageSchema);