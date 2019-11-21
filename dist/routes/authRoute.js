"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authController = require("../controllers/authController");

var authRouter = (0, _express.Router)();
authRouter.post('/signup', _authController.signupController);
var _default = authRouter;
exports["default"] = _default;