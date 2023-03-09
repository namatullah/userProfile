import { ERROR, SUCCESS } from "../constants/returnMessage.js";
import Question from "../models/questions.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
export const fetchAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().sort({ _id: -1 });
        console.log(questions)
        res.status(200).json({ data: questions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const fetchQuestions = async (req, res) => {
    const { page, rowsPerPage } = req.params;
    try {
        const LIMIT = rowsPerPage;
        const startIndex = Number(page) * LIMIT;
        const total = await Question.countDocuments({});
        const questions = Number(rowsPerPage) === (-1) ? await Question.find().sort({ _id: -1 }).populate('subCategory') : await Question.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex).populate('subCategory');



        

        res.status(200).json({ data: questions, page: Number(page), rowsPerPage: Number(rowsPerPage), total: total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createQuestion = async (req, res) => {
    const question = req.body;
    const newQuestion = new Question({ ...question, createdAt: new Date().toISOString() });
    try {
        await newQuestion.save();
        res.status(201).json({ responseMessage: { type: SUCCESS, message: "Question successfully created" }, newQuestion });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Question is not created, try again' } });
    }
}
export const updateQuestion = async (req, res) => {
    const { id } = req.params;
    const question = req.body
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, question, { new: true });
        res.status(201).json({
            responseMessage: { type: SUCCESS, message: "Question successfully updated" },
            updatedQuestion
        });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Question is not created, try again' } });
    }

}
export const deleteQuestion = async (req, res) => {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ responseMessage: { type: SUCCESS, message: "Question successfully deleted" } });
}
/*

[{
    $lookup: {
        from: 'customfield.values',
        'let': { emp_id: '$_id' },
        pipeline: [
            {
                $match: {
                    $expr: {
                        $eq: ['$employee', '$$emp_id']
                    }
                }
            },
            {
                $lookup: {
                    from: 'customfields',
                    'let': { custom_field: '$customfield' },
                    pipeline: [{
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$custom_field']
                            }
                        }
                    }],
                    as: 'customfield'
                }
            }
        ],
        as: 'customfieldvalues'
    }
}]
*/

