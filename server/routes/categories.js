import express from "express";
import {
    createCategory,
    deleteCategory,
    fetchCategories,
    updateCategory,
    createSubCategory,
    deleteSubCategory,
    fetchAllCategories,
} from "../controllers/categories.js";

const router = express.Router();

router.get('/', fetchAllCategories);
router.get('/:page/:rowsPerPage', fetchCategories);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

router.post('/:baseId/sub', createSubCategory);
router.delete('/:baseId/sub/:subId', deleteSubCategory);

export default router;
