import { Router } from 'express';
import {
  signupController,
  signinController
} from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/signin', signinController);

export default authRouter;
