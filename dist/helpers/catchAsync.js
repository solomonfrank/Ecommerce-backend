"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var catchAsync = function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next)["catch"](next);
  };
};

var _default = catchAsync;
exports["default"] = _default;