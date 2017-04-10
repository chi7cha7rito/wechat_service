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
 * 用户注册
 */
/**
 * desc:账户相关的api 定义
 */

router.post("/add", function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var name, phoneNo, idCardNo, smsCode, wechatOpenId, nickName, headImgUrl, dateNow, resp;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        name = req.body.name;
                        phoneNo = req.body.phoneNo;
                        idCardNo = req.body.idCardNo;
                        smsCode = req.body.smsCode;
                        wechatOpenId = req.session.wechatUser.openid;
                        nickName = req.session.wechatUser.nickname;
                        headImgUrl = req.session.wechatUser.headimgurl;
                        dateNow = (0, _moment2.default)().unix();

                        if (!(dateNow - req.session.smsCodeGenDate > 1750)) {
                            _context.next = 11;
                            break;
                        }

                        return _context.abrupt('return', res.json({
                            "status": "0",
                            "message": "短信验证码失效",
                            "data": null
                        }));

                    case 11:
                        if (!(req.session.smsCode != smsCode)) {
                            _context.next = 13;
                            break;
                        }

                        return _context.abrupt('return', res.json({
                            "status": "0",
                            "message": "短信验证码错误",
                            "data": null
                        }));

                    case 13:
                        _context.next = 15;
                        return requestHelper.post({
                            "moduleName": "hulk_service",
                            "controller": "member",
                            "action": "create",
                            "data": {
                                name: name,
                                phoneNo: phoneNo,
                                idCardNo: idCardNo,
                                wechatOpenId: wechatOpenId,
                                nickName: nickName,
                                headImgUrl: headImgUrl
                            }
                        });

                    case 15:
                        resp = _context.sent;


                        res.json(resp);

                        _context.next = 22;
                        break;

                    case 19:
                        _context.prev = 19;
                        _context.t0 = _context['catch'](0);

                        _logger2.default.error('api_account_add_error=>' + _context.t0);

                    case 22:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 19]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

/**
 * 签到
 */
router.post("/signIn", function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
        var memberId, comment, resp;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        memberId = req.session.user.member.id;
                        comment = req.body.comment;
                        _context2.next = 5;
                        return requestHelper.post({
                            "moduleName": "hulk_service",
                            "controller": "signIn",
                            "action": "create",
                            "data": {
                                memberId: memberId,
                                comment: comment
                            }
                        });

                    case 5:
                        resp = _context2.sent;


                        res.json(resp);

                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](0);

                        _logger2.default.error('api_account_signIn_error=>' + _context2.t0);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 9]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=account.js.map