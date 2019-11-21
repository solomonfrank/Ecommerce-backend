import jwt from 'jsonwebtoken'
import User from '../model/userModel';
import catchAsync from '../helpers/catchAsync';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
export const signupController = catchAsync(async (req, res, next) => {
  
  const newUser = await User.create(req.body);
  const token = await jwt.sign({
    id: newUser._id
  },
    JWT_SECRET,
    {expiresIn: JWT_EXPIRES_IN }
   )

  res.status(201).json({
    status: 'success',
    token,
    data: newUser
  });
});

export const signinController = catchAsync(async (req, res, next)=> {

  const user = await User.find()
})
