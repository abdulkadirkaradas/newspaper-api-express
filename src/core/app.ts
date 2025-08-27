import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler';

export const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(errorHandler);