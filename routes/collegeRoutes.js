const express = require('express');
const Router = express.Router();
const collegeController = require("../controllers/collegeController.js");
const auth = require("../middleware/auth.js")

Router.get("/getcolleges",collegeController.getColleges);
Router.get("/college/:id",collegeController.getCollegeWithCourses);
Router.post("/college",auth,collegeController.addCollege);
Router.put("/updatecollege/:id",auth,collegeController.updateCollege);
Router.delete("/deletecolleges/:id",auth,collegeController.deleteCollege);

module.exports = Router;