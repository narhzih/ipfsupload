import { Request, Response, NextFunction } from 'express';
export const appErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(400).json({ message: 'Something went wrong', err });
};
