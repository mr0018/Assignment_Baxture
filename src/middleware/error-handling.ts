import { Request, Response } from 'express';
import HttpStatusCodes from '../constant/httpStatusCodes';

export const notFoundErrorHandler = async (req: Request, res: Response) => {
    return res.status(HttpStatusCodes.NOT_FOUND).json({ error: 'Not found.' });
};
