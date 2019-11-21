import { Router } from 'express';
import { signupController } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', signupController);

export default authRouter;
