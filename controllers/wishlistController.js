
const Wishlist = require('../models/wishlistModel')
const Course = require('../models/coursesModel');
const College = require('../models/collegeModel');

// const addToWishlist = async (req, res) => {
//     const user_id = req.user;
//     console.log("==> requestbody",req.body)
//     const{collegeId,courseId} = req.body
//     console.log("==>collegeId",collegeId)
//     console.log("==>courseId",courseId)
// try {
//     let wishlist = await Wishlist.findOne({ user_id });
//     if (!wishlist) {
//         wishlist = new Wishlist({ user_id, collegeId, courseId: [courseId] });
//         await wishlist.save();
//         res.status(201).send(wishlist);
//     } else{
//         if(wishlist.courseId.includes(courseId)){
//             return res.status(400).json({ message: 'Course already exists in wishlist'})
//         }
//     } 
    
//         wishlist.courseId.push(courseId);
//         await wishlist.save();
//         res.status(200).send(wishlist);
//     }
//    catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
// }
// };
const addToWishlist = async (req, res) => {
  const user_id = req.user;
  try {
      const { collegeId, courseId } = req.body;

      if (!collegeId || !courseId) {
          return res.status(400).send({ error: 'College ID and Course ID are required.' });
      }

      let wishlist = await Wishlist.findOne({ user_id });

      if (wishlist) {
          // Find the college in the wishlist
          const college = wishlist.wishlist.find(w => String(w.collegeId) === String(collegeId));

          if (college) {
              // Check if the course already exists in the college's course list
              if (!college.courses.includes(courseId)) {
                  college.courses.push(courseId);
              } else {
                  return res.status(400).json({ message: 'Course already exists in the wishlist' });
              }
          } else {
              // Add a new college with the course to the wishlist if collegeId doesn't exist
              wishlist.wishlist.push({ collegeId, courses: [courseId] });
          }
      } else {
          // Create a new wishlist for the user if it doesn't exist
          wishlist = new Wishlist({
              user_id,
              wishlist: [{ collegeId, courses: [courseId] }]
          });
      }

      await wishlist.save();
      res.status(200).send(wishlist);
  } catch (error) {
      console.error('Error saving to wishlist:', error);
      res.status(500).send({ error: 'Internal Server Error' });
  }
}


  


const getWishlistItems = async (req, res) => {
    const user_id = req.user;

  try {
      const wishlist = await Wishlist.findOne({ user_id })
        .populate({
          path: 'wishlist.collegeId',
          select: 'name location ' // Select fields to populate from College
        })
        .populate({
          path: 'wishlist.courses',
          select: 'name description duration course_fee' // Select fields to populate from Course
        });

      if (!wishlist) {
        throw new Error('Wishlist not found');
      }
      console.log("==>Printing",wishlist.wishlist)
      res.json(wishlist.wishlist)
      
    } catch (error) {
      console.error('Error retrieving wishlist items:', error);
      throw error;
    }

  }


  const deleteWishlistItem = async (req, res) => {
    const user_id = req.user;
    const { collegeId, courseId } = req.body;

    try {
        let wishlist = await Wishlist.findOne({ user_id });

        if (!wishlist) {
            return res.status(404).send({ message: "Wishlist not found" });
        }

        
        const college = wishlist.wishlist.find(w => w.collegeId.toString() === collegeId);

        if (!college) {
            return res.status(404).send({ message: "College not found in wishlist" });
        }

        
        college.courses = college.courses.filter(c => c.toString() !== courseId);

        
        if (college.courses.length === 0) {
            wishlist.wishlist = wishlist.wishlist.filter(w => w.collegeId.toString() !== collegeId);
        }

        await wishlist.save();
        res.send(wishlist);
    } catch (error) {
        console.error('Error removing item from wishlist:', error);
        res.status(500).send({ error: 'Internal Server Error' });
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