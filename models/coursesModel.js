
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        
    },
    duration:{
        type: String,
        required: true
    },
    course_fee:{
        type: Number,
        required: true
    },
    college: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
      }]
    
 });

 const Course = mongoose.model("Course",CourseSchema);
 module.exports = Course;