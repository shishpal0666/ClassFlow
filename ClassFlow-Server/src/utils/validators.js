const validator = require('validator');

const validateSignupData = (req) => {

    const { firstname, emailId, password } = req.body;

    if (!firstname) {
        throw new Error("Invalid Name");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid Email");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Invalid Password");
    }
};


const validateEditUser = (req) => {

    const allowedEditFields = [
        "firstname",
        "lastname",
        "gender",
        "age",
    ];

    
    const isEditable = Object.keys(req.body).every((feild)=>
        allowedEditFields.includes(feild)
    );

    return isEditable;
};


module.exports = { validateSignupData, validateEditUser };