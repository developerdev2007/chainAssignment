import express, { NextFunction } from "express";
import {config} from "dotenv";
import cors from "cors";
import ServiceRoutes from './routes/routes.js'; 
config();
import { errorMiddleware } from "./utils/errorHandle.js";
import { connectDB } from "./utils/connection.js";
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
connectDB();
app.use('api',ServiceRoutes)
app.use(errorMiddleware);
app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)}
);
