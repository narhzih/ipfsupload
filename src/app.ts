import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { fileRouter, uploadRouter } from './routes';
import { ErrorMiddleware } from './middlewares';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(json());
app.get('/health-check', (req: Request, res: Response) => {
    // implement some health-check logic

    return res.status(200).json({
        message: 'Hitting the right spot!!!',
    });
});

app.use(fileRouter);
app.use(uploadRouter);

app.all('*', (req: Request, res: Response) => {
    return res.status(404).json({
        message: 'Route not found',
    });
});

app.use(ErrorMiddleware.appErrorHandler);
export { app };
