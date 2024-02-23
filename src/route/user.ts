import { Router, Request, Response, json } from "express";
import jsonValidator from "../middleware/json-validator";
import { createUserSchema, deleteUserSchemaParams, getUserSchemaParams, updateUserSchemaBody, updateUserSchemaParams } from "../schema";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controller";


const userRouter = Router();

userRouter.get('/ping', (req: Request, res: Response) => {
    res.send('Success ');
});

userRouter.route('/create')
    .post([
        jsonValidator.validate({ body: createUserSchema }),
        createUser
    ])
userRouter.route('/update/:userId')
    .put([
        jsonValidator.validate({ body: updateUserSchemaBody, params: updateUserSchemaParams }),
        updateUser
    ])
userRouter.route('/get/:userId')
    .get([
        jsonValidator.validate({ params: getUserSchemaParams }),
        getUser
    ])
userRouter.route('/delete/:userId')
    .delete([
        jsonValidator.validate({ params: deleteUserSchemaParams }),
        deleteUser
    ])

userRouter.route('/list')
    .get([
        getUsers
    ])

export default userRouter;