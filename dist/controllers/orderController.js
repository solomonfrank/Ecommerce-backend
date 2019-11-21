"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createOrder = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _orderModel = _interopRequireDefault(require("../model/orderModel"));

var _catchAsync = _interopRequireDefault(require("../helpers/catchAsync"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getOrders = function getOrders(req, res) {
  var queryStr, excludeField, query, sorted, fields, page, limit, skip, numoOrder;
  return _regenerator["default"].async(function getOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queryStr = _objectSpread({}, req.query); // simple filtering

          excludeField = ['page', 'sort', 'limit', 'field'];
          excludeField.forEach(function (item) {
            delete queryStr[item];
          });
          queryStr = JSON.stringify(queryStr);
          queryStr = JSON.parse(queryStr.replace(/\b(gte|lte|gt|lt)\b/g, function (match) {
            return "$".concat(match);
          }));
          console.log(queryStr);
          query = _orderModel["default"].find(queryStr); // sorting

          if (req.query.sort) {
            sorted = req.query.sort.split(',').join(' ');
            query.sort(sorted);
          } else {
            query.sort('createdAt');
          } // limiting


          if (req.query.field) {
            fields = req.query.field.split(',').join(' ');
            query.select(fields);
          } else {
            query.select('-__v'); //exclude __v field
          } // pagination


          page = req.query.page * 1 || 1;
          limit = req.query.limit * 1 || 10;
          skip = (page - 1) * limit;
          query = query.skip(skip).limit(limit);

          if (!req.query.page) {
            _context.next = 19;
            break;
          }

          _context.next = 16;
          return _regenerator["default"].awrap(_orderModel["default"].countsDocument());

        case 16:
          numoOrder = _context.sent;

          if (!(skip >= numoOrder)) {
            _context.next = 19;
            break;
          }

          throw new Error('page does not exist');

        case 19:
          // const order = await query;
          console.log(query);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createOrder = (0, _catchAsync["default"])(function _callee(req, res, next) {
  return _regenerator["default"].async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _regenerator["default"].awrap(_orderModel["default"].create(req.body));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createOrder = createOrder;
var _default = getOrders;
exports["default"] = _default;