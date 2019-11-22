import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';
import catchAsync from '../helpers/catchAsync';
import AppError from '../helpers/errorHandler';
import sendEmail from '../helpers/email';

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
export const forgetPasswordController = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('user email does not exist', 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send user email
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgeot your Password? submt a Patch request with your new password and confirm password to ${resetUrl}. \n if you didn't forget your password, please ignore`;
  try {
    await sendEmail({
      email,
      subject: 'your password reset token, valid for 10mins ',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'token sent to email'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError('there was an error in sending the email', 500));
  }
});

export const resetPasswordController = catchAsync(async (req, res, next) => {
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Link has expired', 400));
  }

  user.password = req.body.password;
  user.confrmPassword = req.body.confirmPassword;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  const token = await jwt.sign(
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
