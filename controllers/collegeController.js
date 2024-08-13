const College = require("../models/collegeModel");

const { v4: uuidv4 } = require('uuid');

const getColleges = async (req, res) => {
    try {
        const colleges = await College.find();
        res.json(colleges);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getCollegeWithCourses = async (req, res) => {
    try {
        const college = await College.findById(req.params.id).populate('courses');
        if (!college) return res.status(404).json({ message: 'College not found' });

        res.json(college);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// const addCollege = async(req,res)=>{

//     try{
//         const {id,name,location,tnea_id,description,image,rating,courses}= req.body;
//         const newCollege = new College({
//             id:uuidv4(),
//             name,
//             location,
//             tnea_id,
//             description,
//             image,
//             rating,
//             courses
//         });
//         await newCollege.save();
//         res.send(newCollege);
//         }
//         catch(err){
//             console.error(err)
//         }
// }



const addCollege = async (req, res) => {
  try {
    const { name, location, tnea_id, description, image, rating, courses } = req.body;

    // Validate the courses array
    if (!Array.isArray(courses) || courses.some(courseId => typeof courseId !== 'string')) {
      return res.status(400).json({ message: 'Invalid courses array' });
    }

    const newCollege = new College({
      id: uuidv4(),
      name,
      location,
      tnea_id,
      description,
      image,
      rating,
      courses // Directly use the array of course IDs
    });

    await newCollege.save();
    res.status(201).json(newCollege);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addCollege };



const updateCollege = async (req, res) => {
        try {
            const { id } = req.params;
    
            const updatedCollege = await College.findOneAndUpdate(
                {id:id}, 
                req.body,
                {new:true}
            );
    
            if (!updatedCollege) {
                return res.status(404).json({ error: 'College not found' });
            }
            
            res.status(200).json(updatedCollege);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating the College details' });
        }
};

 const deleteCollege =async (req, res) => {
    try {
        const { id } = req.params;

        await College.findOneAndDelete({ id: id });
        res.send("College deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while deleting the college");
    }
};


module.exports = {getColleges,getCollegeWithCourses, addCollege,updateCollege, deleteCollege}

