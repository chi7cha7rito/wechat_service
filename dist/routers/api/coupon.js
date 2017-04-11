'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * desc:个人优惠券相关的api 定义
 */

var router = _express2.default.Router();

/**
 * 获取个人优惠券明细
 */
router.get("/get", function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var pageIndex, pageSize, phoneNo, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        pageIndex = req.query.pageIndex;
                        pageSize = req.query.pageSize;
                        phoneNo = req.session.user.phoneNo;
                        _context.next = 6;
                        return requestHelper.get({
                            "moduleName": "hulk_service",
                            "controller": "coupon",
                            "action": "find",
                            "data": {
                                pageIndex: pageIndex,
                                pageSize: pageSize,
                                phoneNo: phoneNo
                            }
                        });

                    case 6:
                        resp = _context.sent;


                        res.json(resp);

                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);

                        _logger2.default.error('api_coupon_get_error=>' + _context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 10]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=coupon.js.map