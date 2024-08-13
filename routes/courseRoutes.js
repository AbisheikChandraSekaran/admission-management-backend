const express = require('express');
const Router = express.Router();
const courseController = require("../controllers/coursesController")
const auth = require("../middleware/auth.js")

Router.get("/courses",courseController.getCoursesForDropdown);
Router.post("/course",auth,courseController.addCourse);
Router.put("/course/:id",auth,courseController.updateCourse);
Router.delete("/course/:id",auth,courseController.deleteCourse);

module.exports = Router;