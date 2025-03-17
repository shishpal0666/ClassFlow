const express = require("express");
const quesRoute = express.Router();
const Question = require("../models/question");
const Answers = require("../models/answer");
const { userAuth } = require("../middleware/userAuth");
const { checkQuesOwner } = require("../middleware/checkQuesOwner");
const { validateQuestion } = require("../utils/validators");

quesRoute.get(
  "/question/:quesCode",
  userAuth,
  checkQuesOwner,
  async (req, res) => {
    try {
      const ansForQues = await Answers.find({
        quesCode: req.question.quesCode,
      });
      const answers = ansForQues.map((item) => item.answer);

      res.json({
        message: "Submitted Answers",
        data: {
          question: req.question.question,
          answers: answers,
        },
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

quesRoute.post("/question/create", userAuth, async (req, res) => {
  try {
    validateQuestion(req);

    const { question } = req.body;

    const createNewQues = new Question({
      fromUserId: req.user._id,
      question,
    });

    const newQues = await createNewQues.save();

    res.json({ message: "Question created successfully", question: newQues });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

quesRoute.get("/question/view/:quesCode", userAuth, async (req, res) => {
  try {
    const quesCode = req.params.quesCode;

    if (!quesCode) {
      throw new Error("Question Code Required");
    }

    const question = await Question.findOne({ quesCode: quesCode });

    if (!question) {
      throw new Error("Question not found");
    }

    res.json({
      message: "Question",
      data: {
        question: question,
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { quesRoute };
