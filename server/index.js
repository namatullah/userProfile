import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from './routes/auth.js'
import customersRouter from "./routes/customers.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/user', userRouter);
app.use('/customers', customersRouter);

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.CONNECTION_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then(() => app.listen(PORT, () => console.log(`server is running on port ${PORT}`)))
    .catch((error) => console.log("Failure: " + error.message));
