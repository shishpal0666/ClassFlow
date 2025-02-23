const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type : String,
            required : true,
            minLength : 3,
            maxLength : 20,
        },
        lastname: {
            type : String,
            maxLength : 20,
            default : null,
        },
        emailId: {
            type : String,
            required : true,
            lowercase : true,
            unique : true,
            trim : true,
            validator(value) {
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email address "+ value);
                }
            },
        }, 
        password: {
            type : String,
            required : true,
        },
        age: {
            type : Number,
            default : null,
        },
        gender: {
            type : String,
            default : null,
            enum : {
                values: ["male","female","other"],
                message: `{VALUE} is not a valid gender type`,
            },
        },
    },
    {
        timestamps : true,
    }
);


// User helper functions

userSchema.methods.getJWT = async function(){

    const user = this;

    // Create JWT tocken
    const token = await jwt.sign({_id:user._id}, "classflow", {expiresIn: "30d"});

    return token;
};


userSchema.methods.validatePassword = async function(passwordInputByUser){

    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;
};


module.exports = mongoose.model('User', userSchema);