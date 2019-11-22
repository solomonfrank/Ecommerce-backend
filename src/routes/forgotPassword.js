import { Router } from 'express';
import { forgetPasswordController } from '../controllers/forgotAndResetPasswordController';

const forgetPasswordRouter = Router();

forgetPasswordRouter.post('/forget-password', forgetPasswordController);

export default forgetPasswordRouter;
