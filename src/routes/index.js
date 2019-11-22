import { Router } from 'express';
import authRouter from './authRoute';
import resetPasswordRouter from './resetPassword';
import forgetPasswordRouter from './forgotPassword';

const apiRouter = Router();

apiRouter.use('/api/v1/auth', authRouter);
apiRouter.use('/api/v1/user', forgetPasswordRouter);
apiRouter.use('/api/v1/user', resetPasswordRouter);

export default apiRouter;
