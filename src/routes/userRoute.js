import { Router } from 'express';
import {
  updateUserController,
  deleteUserController
} from '../controllers/userController';

const userRouter = Router();

userRouter.patch('/updateUser', updateUserController);
userRouter.delete('/deleteUser', deleteUserController);

export default userRouter;
