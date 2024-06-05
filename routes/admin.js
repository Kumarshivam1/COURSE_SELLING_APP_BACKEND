const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");

// Admin Routes
router.post('/signup', async (req, res) => {
    try{
    // Implement admin signup logic
    let {username,password} = req.body;
    
    let check = await Admin.findOne({username});
    if(check){
        return res.status(400).json({
            message:"User already present"
        });
    }
    if(!username || !password){
        return res.status(504).json({
            message:"Email or password missing"
        });
    }
    let response = await Admin.create({username:username,password:password});
    return res.status(200).json({
        message:"Admin create successfully"
    })

    }
    catch(err){
        return res.status(400).json({
            message:err.message,
            error:err
        });
    }
   
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    try{
    let {username,password} = req.body;
    let check = await Admin.findOne({username});
    if(!check){
        return res.status(400).json({
            message:"User doesnot exists"
        });
    }
    if(!username || !password){
        return res.status(504).json({
            message:"Email or password missing"
        });
    }
    if(check.password == password){
        let payload = {
            username: username,
            admin_id : check._id
        };
        console.log("adminid"+check._id)
        let token = jwt.sign(payload,"kumar");
        return res.status(200).json({
            token
        })
    }
    }catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    try{
    // Implement course creation logic
    let {title,description,price,imageLink,published} = req.body;
    if(!title ||!description ||!price ||!imageLink ||!published){
        return res.status(504).json({
            message:"Inputs are Missing"
        });
    }
    const response = await Course.create({title,description,price,imageLink,published});
    return res.status(200).json({
        message:"Course create successfully",
        courseId: response._id
    })
    }
    catch(err){
        return res.status(504).json({
            message:err.message
        });
    }
    
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    try{
        let response = await Course.find();
        return res.status(200).json({
            courses: response,
            adminInfo: req.user
        })
    }catch(err){
        return res.status(504).json({
            message:err.message
        });
    }
});

module.exports = router;