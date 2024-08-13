const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    tnea_id:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating: {
        type: Number
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

});

const College = mongoose.model("College",collegeSchema);
module.exports = College;