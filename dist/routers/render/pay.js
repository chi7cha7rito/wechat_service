'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _router = require('../../utils/router');

var _router2 = _interopRequireDefault(_router);

var _config = require('../../utils/config');

var _config2 = _interopRequireDefault(_config);

var _wechatPay = require('wechat-pay');

var _wechatPay2 = _interopRequireDefault(_wechatPay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * desc:微信付款页面，由于公众号支付页面需要支付的授权目录下面
 */
router.get('/wechat', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { 'title': '在线充值' });

  return res.render('pay/wechat', templateData);
});

/**
 * @desc 微信支付成功页
 */
router.get('/success', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { 'title': '支付成功' });

  return res.render('pay/success', templateData);
});

/**
 * @desc 微信支付失败页
 */
router.get('/error', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { 'title': '支付失败' });

  return res.render('pay/error', templateData);
});

module.exports = router;
//# sourceMappingURL=pay.js.map