import apiRouter from "@/routes/api";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import webRouter from "@/routes/web";
import errorHandler from "./middleware/errorHandler";

export const app: Application = express();

app.use(cors({
  origin: process.env.WEB_ORIGIN || "http://localhost:3001",
  credentials: true
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
// Serving static files
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/", webRouter);
app.use("/api", apiRouter);
app.use(errorHandler);