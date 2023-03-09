

const sendToken=(newUser,res,statusCode)=>{

const token=newUser.getToken()
const option={
    expires:new Date(
        Date.now()+process.env.COOKIES_EXPIRE*24*60*60*1000
    ),
    httpOnly:true
}
res.status(statusCode)
.cookie("token",token,option)
.json({
    success:true,
    newUser,
    token

})

}

module.exports=sendToken