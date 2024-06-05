const jwt = require("jsonwebtoken");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
     try{
        const input = req.headers.authorization;
        if(!input){
            return res.status(400),json({
                message:"No token found"
            })
        }
        const encodedString = input.split(" ")[1];
        console.log(encodedString);
        const decoded = jwt.verify(encodedString,"kumar");
        req.user = decoded;
        console.log(decoded);
        next();

     }
     catch(err){
        return res.status(400).json({
            message:err.message
        })
     }
}

module.exports = adminMiddleware;