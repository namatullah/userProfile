import { ERROR, SUCCESS } from "../constants/returnMessage.js";
import mongoose from "mongoose";
import Customer from "../models/customers.js";

// const ObjectId = mongoose.Types.ObjectId;

export const fetchCustomer = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ _id: -1 });
        res.status(200).json({ data: customers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCustomer = async (req, res) => {
    const customer = req.body;
    const newCustomer = new Customer({ ...customer, createdAt: new Date().toISOString() });
    try {
        await newCustomer.save();
        res.status(201).json({ responseMessage: { type: SUCCESS, message: "Customer successfully created" }, newCustomer });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Customer is not created, try again' } });
    }
}
export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const customer = req.body
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, { new: true });
        res.status(201).json({
            responseMessage: { type: SUCCESS, message: "Customer successfully updated" },
            updatedCustomer
        });
    } catch (error) {
        res.status(409).json({ responseMessage: { type: ERROR, message: 'Customer is not created, try again' } });
    }

}
export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({ responseMessage: { type: SUCCESS, message: "Customer successfully deleted" } });
}
