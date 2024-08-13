const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
    },
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        
}]});

const wishlist = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlist;