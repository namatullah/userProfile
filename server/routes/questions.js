import express from "express";
import {
    createQuestion,
    deleteQuestion,
    fetchAllQuestions,
    fetchQuestions,
    updateQuestion
} from "../controllers/questions.js";

const router = express.Router();

router.get('/', fetchAllQuestions);
router.get('/:page/:rowsPerPage', fetchQuestions);
router.post('/', createQuestion);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
