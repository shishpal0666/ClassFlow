const express = require("express");
const quesRoute = express.Router();
const Question = require("../models/question");
const Answers = require("../models/answer");
const { userAuth } = require("../middleware/userAuth");
const { checkQuesOwner } = require("../middleware/checkQuesOwner");
const { validateQuestion } = require("../utils/validators");

const MAX_LIMIT = 50;

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
    const quesCode = String(req.params.quesCode).replace(/[^a-zA-Z0-9_-]/g, "");
    const includeAnswers = req.query.includeAnswers === "true";
    let page = parseInt(req.query.page, 10);
    let limit = parseInt(req.query.limit, 10);

    if (!quesCode) {
      return res.status(400).json({ message: "Invalid Question Code" });
    }
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1 || limit > MAX_LIMIT) limit = 10;

    // Select timestamps and answerCount as well
    const question = await Question.findOne({ quesCode })
      .select("question quesCode fromUserId answerCount createdAt updatedAt");
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    let responseData = { question };

    if (includeAnswers) {
      const skip = (page - 1) * limit;
      // Select createdAt for answers
      const ansForQues = await Answers.find({ quesCode })
        .select("answer createdAt")
        .skip(skip)
        .limit(limit);
      responseData.answers = ansForQues.map((item) => ({
        answer: item.answer,
        createdAt: item.createdAt,
      }));
    }

    res.json({
      message: "Question",
      data: responseData,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

quesRoute.get("/user/questions", userAuth, async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const questions = await Question.find({ fromUserId: req.user._id })
      .select("question quesCode answerCount createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Question.countDocuments({ fromUserId: req.user._id });

    res.json({ data: { questions, total, page, limit } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { quesRoute };
