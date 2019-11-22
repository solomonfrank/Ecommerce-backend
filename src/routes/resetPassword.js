import { Router } from 'express';
import { resetPasswordController } from '../controllers/forgotAndResetPasswordController';

const resetPasswordRouter = Router();

resetPasswordRouter.patch('/reset-password', resetPasswordController);

export default resetPasswordRouter;
