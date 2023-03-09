
const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please Enter Your FirstName"]
    },
    middleName: {
        type: String,

    },
    lastName: {
        type: String,
        required: [true, "Please Enter Your LastName"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [4, "password connot lessthan 4 characters"],
        select:false
    },
    DOB: {
        type: String,
        trim: true,

    },
    occupation: {
        type: String,
    },
    company: {
        type: String
    },
    phoneNumber: {
        required: true,
        type: String,
        unique: true,
    }

})

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getToken =function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}


const User = mongoose.model("User", userSchema)

module.exports = User

