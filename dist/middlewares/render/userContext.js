'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _wechatOauth = require('wechat-oauth');

var _wechatOauth2 = _interopRequireDefault(_wechatOauth);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../../utils/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wechatConfig = _config2.default.getWechat();
/**
 * desc:
 */

var client = new _wechatOauth2.default(wechatConfig.appid, wechatConfig.secret);

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
        var absoluteUrl, url;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        try {
                            //判断路由是否是account/register
                            absoluteUrl = req.baseUrl + req.path;

                            //todo:之后需要加个配置管理如下的特殊需求

                            if (absoluteUrl == "/account/register" || absoluteUrl == "/wechat/" || absoluteUrl == "/wechat/auth" || absoluteUrl == "/wechat/notify") {
                                next();
                            } else {
                                if (!req.session.user) {
                                    url = client.getAuthorizeURL(wechatConfig.host + '/wechat/auth', absoluteUrl);

                                    res.redirect(url);
                                } else {
                                    next();
                                }
                            }
                        } catch (e) {
                            _logger2.default.error("userContext error" + (0, _stringify2.default)(e));
                        }

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=userContext.js.map