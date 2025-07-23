const express = require('express');
const ansRoute = express.Router();
const { userAuth } = require('../middleware/userAuth');
const { validateAnswer } = require('../utils/validators');
const Question = require('../models/question');
const Answer = require('../models/answer');


ansRoute.post('/answer/submit', userAuth, async (req,res) => {
    try {
        validateAnswer(req);

        const { answer, quesCode } = req.body;
        const question = await Question.findOne({ quesCode: quesCode });

        if (!question) {
            throw new Error("Question not found");
        }

        const questionId = question._id;

        const createNewAns = new Answer({
            questionId,
            quesCode,
            answer,
            userId: req.user._id,
        });

        const newAns = await createNewAns.save();

        // Increment answerCount for the question
        await Question.updateOne(
            { _id: questionId },
            { $inc: { answerCount: 1 } }
        );

        res.json({ message: "Answer submitted successfully", answer: newAns });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

ansRoute.get("/user/answers", userAuth, async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Get answers for the logged-in user
    const answers = await Answer.find({ userId: req.user._id })
      .select("answer quesCode createdAt userId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Answer.countDocuments({ userId: req.user._id });

    res.json({ data: { answers, total, page, limit } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { ansRoute };