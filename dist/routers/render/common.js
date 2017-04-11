'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _router = require('../../utils/router');

var _router2 = _interopRequireDefault(_router);

var _config = require('../../utils/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var wechatConfig = _config2.default.getWechat();

/**
 * @desc 统一的出错页面
 */
router.get('/error', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var param, templateData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            param = {
              req: req,
              matchJavascript: true,
              matchStylesheet: true
            };
            templateData = _router2.default.getTemplateBasicData(param);


            (0, _assign2.default)(templateData, { 'title': '出错' });

            return _context.abrupt('return', res.render('booking/room', templateData));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            _logger2.default.error('render_common_error_error=>' + _context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * 获取微信的accessToken
 */
router.get('/getAccessToken', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var accessTokenInfo;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.query.secret == wechatConfig.secret)) {
              _context2.next = 7;
              break;
            }

            _context2.next = 3;
            return requestHelper.get({
              "moduleName": "wechat",
              "controller": "common",
              "action": "getAccessToken",
              "data": {
                "grant_type": "client_credential",
                "appid": wechatConfig.appid,
                "secret": wechatConfig.secret
              }
            });

          case 3:
            accessTokenInfo = _context2.sent;


            res.json({
              "status": "1",
              "message": "",
              "data": (0, _stringify2.default)(accessTokenInfo)
            });

            _context2.next = 8;
            break;

          case 7:
            res.json({
              status: "0",
              message: "",
              data: null
            });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * 公司介绍
 */
router.get('/intro', function (req, res, next) {
  try {
    var param = {
      req: req,
      matchJavascript: true,
      matchStylesheet: true
    };

    var templateData = _router2.default.getTemplateBasicData(param);

    (0, _assign2.default)(templateData, { 'title': '介绍' });

    return res.render('common/intro', templateData);
  } catch (e) {
    _logger2.default.error('render_common_intro_error=>' + e);
  }
});

module.exports = router;
//# sourceMappingURL=common.js.map