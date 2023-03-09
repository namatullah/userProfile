import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name: String,
    category: { type: mongoose.Types.ObjectId, ref: 'Category' }
});
const categorySchema = mongoose.Schema({
    name: String,
    subCategories: [{ type: mongoose.Types.ObjectId, ref: "SubCategory" }],
    createdAt: {
        type: Date,
        default: new Date()
    }
});
export const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export const Category = mongoose.model('Category', categorySchema);
export default { Category, SubCategory };
