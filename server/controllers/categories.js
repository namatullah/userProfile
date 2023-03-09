import { ERROR, SUCCESS } from "../constants/returnMessage.js";
import { ObjectId } from "mongodb";
import { Category, SubCategory } from "../models/category.js";

export const fetchAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ _id: -1 }).populate('subCategories');
        res.status(200).json({ data: categories });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const fetchCategories = async (req, res) => {
    const { page, rowsPerPage } = req.params;
    try {
        const LIMIT = rowsPerPage;
        const startIndex = Number(page) * LIMIT;
        const total = await Category.countDocuments({});
        const categories = Number(rowsPerPage) === (-1) ? await Category.find().sort({ _id: -1 }).populate('subCategories') : await Category.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex).populate('subCategories');
        res.status(200).json({ data: categories, page: Number(page), rowsPerPage: Number(rowsPerPage), total: total });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = new Category({ ...category, createdAt: new Date().toISOString() });
    try {
        await newCategory.save();
        res.status(201).json({ responseMessage: { type: SUCCESS, message: "Category successfully created" }, newCategory });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Category is not created, try again' } });
    }
}
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const category = req.body
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, category, { new: true }).populate('subCategories');
        res.status(201).json({
            responseMessage: { type: SUCCESS, message: "Category successfully updated" },
            updatedCategory
        });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Category is not created, try again' } });
    }

}
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    await SubCategory.deleteMany({ category: id });

    res.status(200).json({ responseMessage: { type: SUCCESS, message: "Category successfully deleted" } });
}

export const createSubCategory = async (req, res) => {
    const { baseId } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findById(baseId);
        const subCategory = new SubCategory({ name, category: category._id });
        category.subCategories.push(subCategory);
        subCategory.save();
        const updatedCategory = await Category.findByIdAndUpdate(baseId, category, { new: true }).populate('subCategories');
        res.status(201).json({
            responseMessage: { type: SUCCESS, message: "Sub category successfully created" },
            updatedCategory
        });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Category is not created, try again' } });
    }
}

export const deleteSubCategory = async (req, res) => {
    const { baseId, subId } = req.params;
    try {
        const category = await Category.findById(baseId);
        category.subCategories = category.subCategories.filter((item) => item._id.toString() !== subId);
        await SubCategory.deleteMany({ category: baseId, _id: subId })
        const updatedCategory = await Category.findByIdAndUpdate(baseId, category, { new: true }).populate('subCategories');
        res.status(201).json({
            responseMessage: { type: SUCCESS, message: "Sub category successfully deleted" },
            updatedCategory
        });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Category is not deleted, try again' } });
    }
}
