import jwt from 'jsonwebtoken';
import catchAsync from '../helpers/catchAsync';
import User from '../model/userModel';
import AppError from '../helpers/errorHandler';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
export const updatePasswordController = catchAsync(async (req, res, next) => {
  const user = User.findById({ _id: req.user._id }).select('+password');
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('invalid user password', 401));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  const token = jwt.sign(
    {
      id: user._id
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  res.status(200).json({
    status: 'success',
    token
  });
});
