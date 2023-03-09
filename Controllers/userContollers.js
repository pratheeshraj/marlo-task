const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrorHandler=require("../middleware/AsyncErrorHandler");
const sendToken = require("../utils/jwt");

// create user

exports.RegisterUser =AsyncErrorHandler( async (req, res) => {
    const {
        firstName,
        lastName,
        middleName,
        DOB,
        email,
        password,
        occupation,
        company, phoneNumber } = req.body;
       const newUser = await User.create({
            firstName,
            lastName,
            middleName,
            DOB,
            email,
            password,
            occupation,
            company,
            phoneNumber
        })

        sendToken(newUser,res,201)


})

// login user

exports.LoginUser =AsyncErrorHandler(  async (req, res, next) => {

    const { email, password } = req.body

    const newUser = await User.findOne({ email }).select("+password")
        if (!newUser) {
            return next(new ErrorHandler("Invalid Email Or Password", 404))
        }

        const passwordValidater = await bcrypt.compare(password, newUser.password)

        if (!passwordValidater) {
            return next(new ErrorHandler("Invalid Email Or Password", 404))
        }

        sendToken(newUser,res,201)
})

// get single users


exports.GetUserProfile = AsyncErrorHandler (async (req, res,next) => {

    
        const user = await User.findById(req.user.id)
        res.status(200).json({
            success: true,
            user
        })

})

// update single user

exports.UpdateUser = AsyncErrorHandler ( async (req, res) => {

    let user = await User.findById(req.user.id)

    if(req.body.password){
        req.body.password=await bcrypt.hash(req.body.password,10)
    }


        user = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            user
        })

})





// delete single user

exports.DeleteUser = AsyncErrorHandler ( async (req, res) => {
    console.log(req.user.id);
   
        const user = await User.findByIdAndDelete(req.user.id)

        if (!user) {
            return next(new ErrorHandler("User Not Existed", 404))
        }
        res.status(200).json({
            success: true,
            message: "User is Deleted"
        })

})

//logout user  

exports.LogoutUser=AsyncErrorHandler(async(req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    }).status(201).json({
        success:true,
        message:"Loggedout"
    })

})