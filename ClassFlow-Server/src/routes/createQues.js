const express = require('express');
const quesRoute = express.Router();
const Question = require('../models/question');
const { userAuth } = require('../middleware/userAuth');
const { validateQuestion } = require('../utils/validators');

quesRoute.post('/question/create', userAuth, async (req,res)=>{
    try{

        validateQuestion(req);

        const {question} = req.body;

        const createNewQues = new Question({
            fromUserId : req.user._id,
            question,
        });

        const newQues = await createNewQues.save();
        
        res.json({ message: "Question created successfully", question : newQues });
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});


module.exports = { quesRoute };