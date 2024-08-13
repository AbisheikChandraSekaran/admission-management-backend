
const Wishlist = require('../models/wishlistModel')
const Course = require('../models/coursesModel');
const College = require('../models/collegeModel');

const addToWishlist = async (req, res) => {
    const user_id = req.user;
    console.log("==> requestbody",req.body)
    const{collegeId,courseId} = req.body
    console.log("==>collegeId",collegeId)
    console.log("==>courseId",courseId)
    
//     try {
        
//          let wishlist = await Wishlist.findOne({user_id});
//          if(!wishlist){
//             wishlist = new Wishlist({user_id,collegeId,courseId})
//             await wishlist.save();
//             res.status(201).send(wishlist)
//          }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
try {
    let wishlist = await Wishlist.findOne({ user_id });
    if (!wishlist) {
        wishlist = new Wishlist({ user_id, collegeId, courseId: [courseId] });
        await wishlist.save();
        res.status(201).send(wishlist);
    } else{
        if(wishlist.courseId.includes(courseId)){
            return res.status(400).json({ message: 'Course already exists in wishlist'})
        }
    } 
    
        wishlist.courseId.push(courseId);
        await wishlist.save();
        res.status(200).send(wishlist);
    }
   catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
}
};


const getWishlistItems = async (req, res) => {
    const user_id = req.user;
    
    try {
        const wishlist = await Wishlist.find({ user_id });
        if (!wishlist) {
            return res.status(404).send({ message: "Wishlist not found" });
        }
        console.log(wishlist);

        const wishlistDetails = await Promise.all(wishlist.map(async (item) => {
            console.log(item.collegeId)
            const collegeInfo = await College.findOne({_id:item.collegeId });
            // console.log("==>College Info",collegeInfo)
            // const courseInfo = await Course.findOne({_id:item.courseId });
            const courseDetails = await Promise.all(
                item.courseId.map(async (id) => {
                    const courseInfo = await Course.findOne({ _id: id });
                    if (!courseInfo) {
                        return null;
                    }
                    return {
                        course_id: id,
                        course_name: courseInfo.name,
                        course_description: courseInfo.description,
                        course_image:courseInfo.image,
                        course_fee:courseInfo.course_fee
                    };
                })
            );
            const validCourseDetails = courseDetails.filter(detail => detail !== null);
            // console.log("==>Course Info",courseInfo)
           
    
            return {
                college_id: item.collegeId,
                college_name: collegeInfo.name,
                course_id: item.courseId,
                courses:validCourseDetails
            };
        }));

        res.send(wishlistDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

const deleteWishlistItem = async (req, res) => {
    const user_id = req.user;
    const course_id = req.body.course_id;

    try {
        const wishlist = await Wishlist.findOneAndDelete({ user_id, course_id });
        if (!wishlist) {
            return res.status(404).send({ message: "Wishlist item not found" });
        }
        res.send(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

const deleteEntireWishlist = async (req, res) => {
    const user_id = req.user;

    try {
        const wishlist = await Wishlist.deleteMany({ user_id });
        if (!wishlist) {
            return res.status(404).send({ message: "Wishlist not found" });
        }
        res.send(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

module.exports = { addToWishlist, getWishlistItems, deleteWishlistItem, deleteEntireWishlist };