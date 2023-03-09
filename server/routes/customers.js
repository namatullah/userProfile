import express from "express";
import { createCustomer, deleteCustomer, fetchCustomer, updateCustomer } from "../controllers/customers.js";

const router = express.Router();

router.get('/', fetchCustomer);
router.post('/', createCustomer);
router.patch('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
