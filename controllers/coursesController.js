const Course = require("../models/coursesModel");

const { v4: uuidv4 } = require('uuid');


const getCoursesForDropdown = async (req,res) => {
    try {
      // Fetch all courses
      const courses = await Course.find({});
      if (!courses || courses.length === 0) {
        throw new Error('No courses found');
      }
      res.send(courses);
      // Format courses for dropdown (assuming you need an array of objects with id and name)
      return courses.map(course => ({
        value: course._id, // Dropdown value
        label: course.name // Dropdown display text
      }));
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  };
  



const addCourse = async(req,res)=>{

    try{
        const {id,name,description,duration,course_fee,college}= req.body;
        const newCourse = new Course({
            id:uuidv4(),
            name,
            description,
            duration,
            course_fee,
            college
        });
        await newCourse.save();
        res.send(newCourse);
        }
        catch(err){
            console.error(err)
        }
}


const updateCourse = async (req, res) => {
        try {
            const { id } = req.params;
    
            const updatedCourse = await Course.findOneAndUpdate(
                {id:id}, 
                req.body,
                {new:true}
            );
    
            if (!updatedCourse) {
                return res.status(404).json({ error: 'Course not found' });
            }
    
            res.status(200).json(updatedCourse);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating the Course details' });
        }
};

 const deleteCourse = async(req,res)=>{
        try{
            const {id} = req.params
    
            await Course.findOneAndDelete({id:id},req.body);
            res.send("Course deleted successfully");
        }
        catch(err){
            console.error(err)
        }
     
};


module.exports = {getCoursesForDropdown, addCourse,updateCourse, deleteCourse}

