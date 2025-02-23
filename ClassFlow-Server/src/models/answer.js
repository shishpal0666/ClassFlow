const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        questionId: {
            type : mongoose.Schema.ObjectId,
            ref : "Question",
            required : true,
        },
        quesCode: {
            type : String,
            required : true,
        },
        answer: {
            type : String,
            default : null,
        },
    },
    {
        timestamps : true,
    }
);

module.exports = mongoose.model("Answer", answerSchema);
