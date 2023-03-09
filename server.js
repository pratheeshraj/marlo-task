const app = require("./app");
const DbConnection = require("./config/dbConnection");

const dotenv=require("dotenv").config()

const PORT=process.env.PORT
DbConnection()
app.listen(PORT,()=>{

    console.log(`server is running on ${PORT} in ${process.env.NODE_ENV}`);

})