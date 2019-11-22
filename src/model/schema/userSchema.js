import mongoose from 'mongoose';
import crypto from 'crypto';
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
});

// document middleware for mongoose
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.post('save', function(doc, next) {
  doc.password = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
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

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

export default userSchema;
