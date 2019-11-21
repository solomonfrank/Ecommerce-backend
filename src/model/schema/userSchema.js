import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first Name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, 'Password must be greater than five characters'],
    required: [true, 'password is required'],
    select: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default userSchema;
