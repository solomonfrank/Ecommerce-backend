"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var userSchema = new _mongoose["default"].Schema({
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
    validate: [_validator["default"].isEmail, 'please provide a valid email']
  },
  password: {
    type: String,
    trim: true,
    minlength: [6, 'Password must be greater than five characters'],
    required: [true, 'password is required'],
    select: true
  },
  confirmPassword: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  }
});
var _default = userSchema;
exports["default"] = _default;