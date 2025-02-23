const mongoose = require("mongoose");
const crypto = require('crypto');

const questionSchema = new mongoose.Schema(
    {
        fromUserId: {
            type : mongoose.Schema.ObjectId,
            ref : "User",
            required : true,
        },
        question: {
            type: String,
            required :true,
        },
        quesCode: {
            type : String,
            unique : true,
        },
    },
    {
        timestamps : true,
    }
);

questionSchema.pre("save", function(next){
    if(!this.quesCode){
        this.quesCode = crypto.randomBytes(6).toString("hex");
    }
    next();
});

module.exports = mongoose.model('Question', questionSchema);