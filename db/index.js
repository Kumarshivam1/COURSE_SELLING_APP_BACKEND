const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = () => { 
    mongoose.connect("mongodb://localhost:27017/CourseSellerWithAuth");
    console.log("Connected with DB")
};

// Define schemas
const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    purchasedCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    imageLink:{
        type:String,
        required:true
    },
    published:{
        type:Boolean,
        required:true
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course,
    connectDB
}