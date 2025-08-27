import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
