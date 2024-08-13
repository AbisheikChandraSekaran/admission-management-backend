const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes")
const collegeRoutes = require("./routes/collegeRoutes")
const courseRoutes = require("./routes/courseRoutes")
const wishlistRoutes= require("./routes/wishlistRoutes")

const cors = require('cors');
const bodyparser = require('body-parser');

app.use(bodyparser.json());


require('dotenv').config();


const MONGO_URI = process.env.MONGO_URI;
const Port = process.env.Port || 3000;
app.use(cors());

mongoose.connect(MONGO_URI).then(()=>{
    console.log("MongoDB Connected");
});

app.set('view engine',"ejs");
app.set(express.json());
app.use("/",userRoutes);
app.use("/",collegeRoutes);
app.use("/",courseRoutes);
app.use("/",wishlistRoutes);

app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});



