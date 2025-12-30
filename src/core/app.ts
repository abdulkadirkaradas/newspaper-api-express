import apiRouter from "@/routes/api";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import webRouter from "@/routes/web";
import errorHandler from "./middleware/errorHandler";

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/", webRouter);
app.use("/api", apiRouter);

app.use(errorHandler);