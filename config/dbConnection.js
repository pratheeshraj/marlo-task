const mongoose=require("mongoose")



const DbConnection=()=>{

    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(
        console.log("DB is connected")
    ).catch((err)=>console.log(err))
}

module.exports=DbConnection