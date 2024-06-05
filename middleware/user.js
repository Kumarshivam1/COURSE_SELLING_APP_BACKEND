function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
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
        next();

     }
     catch(err){
        return res.status(400).json({
            message:err.message
        })
     }
}

module.exports = userMiddleware;