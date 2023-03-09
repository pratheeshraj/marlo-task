const express=require("express")
const { RegisterUser,LoginUser, GetUserProfile,DeleteUser,UpdateUser,LogoutUser } = require("../Controllers/userContollers")
const { IsAuthenticatedUser } = require("../middleware/authenticate")


const router=express.Router()


router.post("/register",RegisterUser)
router.post("/login",LoginUser)

router.get("/myprofile",IsAuthenticatedUser, GetUserProfile)
router.delete("/deleteuser",IsAuthenticatedUser,DeleteUser)
router.put("/updateuser",IsAuthenticatedUser,UpdateUser)
router.get("/logout",LogoutUser)
module.exports=router