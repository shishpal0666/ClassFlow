const express = require('express');
const ansRoute = express.Router();
const { userAuth } = require('../middleware/userAuth');
const { validateAnswer } = require('../utils/validators');
const Question = require('../models/question');
const Answer = require('../models/answer');


ansRoute.post('/answer/submit', userAuth, async (req,res) => {
    try{

        validateAnswer(req);

        const { answer, quesCode, questionId } = req.body;

        const question = await Question.findOne({ quesCode : quesCode });

        if(!question){
            throw new Error("Question not found");
        }

        const createNewAns = new Answer({
            questionId,
            quesCode,
            answer,
        });

        const newAns = await createNewAns.save(); 

        res.json({ message: "Answer submitted successfully", answer : newAns });
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = { ansRoute };