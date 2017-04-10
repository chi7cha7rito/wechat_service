'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * 获取赛事信息
 */
/**
 * desc:比赛相关的api 定义
 */

router.get("/get", function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var pageIndex, pageSize, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        pageIndex = req.query.pageIndex;
                        pageSize = req.query.pageSize;
                        _context.next = 5;
                        return requestHelper.get({
                            "moduleName": "hulk_service",
                            "controller": "match",
                            "action": "find",
                            "data": {
                                applyOnline: true,
                                status: 1,
                                startClosing: (0, _moment2.default)().format(),
                                pageIndex: pageIndex,
                                pageSize: pageSize
                            }
                        });

                    case 5:
                        resp = _context.sent;


                        res.json(resp);

                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](0);

                        _logger2.default.error('api_match_get_error=>' + _context.t0);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 9]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

/**
 * 获取比赛结果
 */
router.get("/result", function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
        var pageIndex, pageSize, memberId, resp;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        pageIndex = req.query.pageIndex;
                        pageSize = req.query.pageSize;
                        memberId = req.session.user.member.id;
                        _context2.next = 6;
                        return requestHelper.get({
                            "moduleName": "hulk_service",
                            "controller": "match",
                            "action": "result",
                            "data": {
                                pageIndex: pageIndex,
                                pageSize: pageSize,
                                memberId: memberId
                            }
                        });

                    case 6:
                        resp = _context2.sent;


                        res.json(resp);

                        _context2.next = 13;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](0);

                        _logger2.default.error('api_match_result_error=>' + _context2.t0);

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 10]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

/**
 * 报名参赛
 */
router.post("/apply", function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
        var memberId, matchId, resp;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        memberId = req.session.user.member.id;
                        matchId = req.body.matchId;
                        _context3.next = 5;
                        return requestHelper.post({
                            "moduleName": "hulk_service",
                            "controller": "match",
                            "action": "apply",
                            "data": {
                                memberId: memberId,
                                matchId: matchId
                            }
                        });

                    case 5:
                        resp = _context3.sent;


                        res.json(resp);

                        _context3.next = 12;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](0);

                        _logger2.default.error('api_match_apply_error=>' + _context3.t0);

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 9]]);
    }));

    return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=match.js.map