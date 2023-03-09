import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    isCorrect: Boolean,
    answer: String
}, {_id: true});

const questionSchema = mongoose.Schema({
    subCategory: { type: mongoose.Types.ObjectId, ref: "SubCategory" },
    info: String,
    question: String,
    answers: [answerSchema],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
