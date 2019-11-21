import { Router } from 'express';
import authRouter from './authRoute';

const apiRouter = Router();

apiRouter.use('/api/v1/auth', authRouter);

export default apiRouter;
