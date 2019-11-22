import catchAsync from '../helpers/catchAsync';
import AppError from '../helpers/errorHandler';
import User from '../model/userModel';

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
export const updateUserController = catchAsync(async (req, res, next) => {
  const {
    user: { id }
  } = req;
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('request not allowed don this route', 400));
  }
  const filterBody = filterObj(req.body, 'email', 'name');
  const updatedUser = await User.findByIdAndUpdate(id, filterBody, {
    new: true, // to return new updated data
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: updatedUser
  });
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: users
  });
});
export const deleteUserController = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});
