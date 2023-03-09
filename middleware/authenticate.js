const ErrorHandler = require("../utils/ErrorHandler")
const AsyncErrorHandler = require("./AsyncErrorHandler")
const jwt=require("jsonwebtoken")
const User = require("../models/userModel")

exports.IsAuthenticatedUser=AsyncErrorHandler (async(req,res,next)=>{

    const {token}=req.cookies

    if(!token){
        return next(new ErrorHandler("Login First To  Access This"))
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded.id)
    next()

})
