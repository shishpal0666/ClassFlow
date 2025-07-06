const express = require("express");
const historyRoute = express.Router();
const { userAuth } = require("../middleware/userAuth");
const Question = require("../models/question");
const Answer = require("../models/answer");

historyRoute.get("/user/history/questions", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalQuestions = await Question.countDocuments({
      fromUserId: userId,
    });

    const questions = await Question.find({ fromUserId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("question quesCode createdAt updatedAt")
      .lean();

    res.json({
      totalQuestions,
      currentPage: page,
      totalPages: Math.ceil(totalQuestions / limit),
      questions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

historyRoute.get("/user/history/answers", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const allQuestions = await Question.find({ fromUserId: userId })
      .select("_id quesCode question createdAt")
      .lean();
    const questionIdMap = {};
    allQuestions.forEach((q) => (questionIdMap[q._id] = q));
    const questionIds = allQuestions.map((q) => q._id);

    const totalAnswers = await Answer.countDocuments({
      questionId: { $in: questionIds },
    });

    const answers = await Answer.find({ questionId: { $in: questionIds } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("questionId answer createdAt updatedAt")
      .lean();

    const results = answers.map((ans) => ({
      answerId: ans._id,
      answer: ans.answer,
      submittedAt: ans.createdAt,
      updatedAt: ans.updatedAt,
      quesCode: questionIdMap[ans.questionId]?.quesCode,
      question: questionIdMap[ans.questionId]?.question,
      questionCreatedAt: questionIdMap[ans.questionId]?.createdAt,
    }));

    res.json({
      totalAnswers,
      currentPage: page,
      totalPages: Math.ceil(totalAnswers / limit),
      answers: results,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { historyRoute };
