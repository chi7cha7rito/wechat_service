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
 * desc:个人积分相关的api 定义
 */

var router = _express2.default.Router();

/**
 * 获取个人积分信息
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
                            "controller": "points",
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

                        _logger2.default.error('api_credits_get_error=>' + _context.t0);

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

/**
 * 获取个人积分余额
 */
router.get("/total", function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
        var memberId, resp;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        memberId = req.session.user.member.id;
                        _context2.next = 4;
                        return requestHelper.get({
                            "moduleName": "hulk_service",
                            "controller": "points",
                            "action": "total",
                            "data": {
                                memberId: memberId
                            }
                        });

                    case 4:
                        resp = _context2.sent;


                        res.json(resp);

                        _context2.next = 11;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        _logger2.default.error('api_points_total_error=>' + _context2.t0);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 8]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=credits.js.map