const Question = require('../models/question');


const checkQuesOwner = async (req, res, next) => {

    try{

        const quesCode  = req.params.quesCode;
        const userId = req.user._id;


        if(!quesCode){
            throw new Error("Question Code Required");
        }

        const question = await Question.findOne({ quesCode : quesCode });

        if(!question){
            throw new Error("Question not found");
        }

        if(question.fromUserId.toString() !== userId.toString()){
            throw new Error("Access denied");
        }

        req.question = question;
        
        next();
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
};


module.exports = { checkQuesOwner };