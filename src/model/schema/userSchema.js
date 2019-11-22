import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
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
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email']
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, 'Password must be greater than five characters'],
    required: [true, 'password is required'],
    select: false
  },
  confirmPassword: {
    type: String,
    trim: true,
    validate: {
      // eslint-disable-next-line object-shorthand
      validator: function(val) {
        return val === this.password;
      },
      message: 'password does not match'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
  passwordChangedAt: Date
});

// document middleware for mongoose
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

//instance method
userSchema.methods.correctPassword = async function(
  newPassword,
  storePassword
) {
  return await bcrypt.compare(newPassword, storePassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

export default userSchema;
