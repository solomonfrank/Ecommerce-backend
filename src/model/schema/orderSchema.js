import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'first Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'last name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password is required'],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default orderSchema;
