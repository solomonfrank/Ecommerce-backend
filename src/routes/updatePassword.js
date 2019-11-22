import { Router } from 'express';
import { updatePasswordController } from '../controllers/updatePasswordController';
import { protect } from '../controllers/authController';

const updatePasswordRouter = Router();

updatePasswordRouter.post(
  '/update-password',
  protect,
  updatePasswordController
);

export default updatePasswordRouter;
