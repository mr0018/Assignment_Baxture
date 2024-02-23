import { Router, Request, Response } from "express";
import APIPaths from "../constant/apiPath";
import userRouter from "./user";


const appRouter = Router();

appRouter.get('/ping', (req: Request, res: Response) => {
    res.send('Success ');
});

appRouter.use(APIPaths.USER_BASE, userRouter);

export default appRouter;