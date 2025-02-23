const validator = require('validator');

const validateSignupData = (req) => {

    const { firstname, emailId, password} = req.body;

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


const validateQuestion = (req) => {

    const { question } = req.body;

    if(!question){
        throw new Error("Question is required");
    }
};


const validateAnswer = (req) => {

    const { answer, quesCode, questionId } = req.body;

    if(!quesCode){
        throw new Error("Question code required");
    }else if(!answer){
        throw new Error("Answer is required");
    }else if(!questionId){
        throw new Error("Question Id required");
    }

};


module.exports = { validateSignupData, validateEditUser, validateQuestion, validateAnswer };