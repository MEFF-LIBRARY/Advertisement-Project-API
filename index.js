import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import { productRouter } from "./routes/products.js";

await mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(productRouter);

app.listen(3002, () => {
    console.log('App is listening on port 3002')
});