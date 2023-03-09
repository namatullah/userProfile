import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    fullname: String,
    email: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
