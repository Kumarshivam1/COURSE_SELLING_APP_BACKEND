const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try{
    let username = req.body.username;
    let password = req.body.password;
    if(!username ||!password){
        return res.status(504).json({
            message:"Inputs are Missing"
        })
    }
    let check = await User.findOne({username});
    if(check){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const response = await User.create({username,password});
    return res.status(200).json({
        message:"User created successfully"
    })
    }catch(err){
        return res.status(400).json({
            result:"User creation Unsuccessfull",
            message:err.message
        })
    }
    
});

router.post('/signin', async(req, res) => {
    try{
        let {username,password} = req.body;
        let check = await User.findOne({username});
        if(!check){
            return res.status(400).json({
                message:"User does not present"
            });
        }
        if(!username || !password){
            return res.status(504).json({
                message:"Email or password missing"
            });
        }
        if(check.password == password){
            
            let token = jwt.sign({username:username, user_id:check._id},"kumar");
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


router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    try{
        let course = await Course.find();
        res.status(200).json({
            courses: course
        })
    }
    catch(err){
        res.status(400).json({
            result:false,
            message:err.message
        })
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    try{
    let username = req.headers.username;
    let user = await User.findOne({username});
    let course_id = req.params.courseId;
    let check = await Course.findOne({_id:course_id});
    console.log(course_id);
    if(!check){
        return res.status(504).json({
            message:"No course found"
        })
    }
    const updatedUser = await User.findByIdAndUpdate(user._id,{$push:{purchasedCourses:course_id}},{new:true})
    res.status(200).json({
        message:"Course purchased successfully"
    })
}
    catch(err){
        return res.status(400).json({
            message:err.message
        })
    }
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        let username = req.headers.username;
        const purchasedCourse = await User.findOne({username});
        res.status(200).json({
            purchasedCourses: purchasedCourse.purchasedCourses
        })
    }
    catch(err){
        return res.status(400).json({
            message:err.message
        })
    }

});

module.exports = router