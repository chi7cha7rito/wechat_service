'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../../utils/config');

var _config2 = _interopRequireDefault(_config);

var _wechatPay = require('wechat-pay');

var _wechatPay2 = _interopRequireDefault(_wechatPay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * desc:账户相关的api 定义
 */

var router = _express2.default.Router();

var wechatConfig = _config2.default.getWechat();

//wechat pay unifiedorder 基本参数
var payment = new _wechatPay2.default.Payment({
  "appId": wechatConfig.appid,
  "mchId": wechatConfig.mch_id,
  "partnerKey": wechatConfig.partnerKey,
  "notifyUrl": wechatConfig.host + '/wechat/notify'
});

/**
 * desc:微信支付调用统一下单接口，获取prepay_id
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */
router.post("/getPrePayInfo", function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var respData, getBrandWCPayRequestParams, memberId, appid, mch_id, notify_url, body, attach, total_fee, spbill_create_ip, openid, out_trade_no, trade_type, order, payargs, resp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            respData = {
              "status": "1",
              "message": "",
              "data": null
            };
            _context.prev = 1;

            getBrandWCPayRequestParams = function getBrandWCPayRequestParams(order) {
              return new _promise2.default(function (resolve, reject) {
                payment.getBrandWCPayRequestParams(order, function (err, payargs) {
                  if (err) {
                    reject(err);
                  };
                  resolve(payargs);
                });
              });
            };

            memberId = req.session.user.member.id;
            appid = wechatConfig.appid;
            mch_id = wechatConfig.mch_id;
            notify_url = wechatConfig.host + '/wechat/notify';
            body = req.body.name;
            attach = req.session.user.member.id;
            total_fee = req.body.price * 100;
            spbill_create_ip = "127.0.0.1";
            openid = req.session.user.member.wechat.wechatOpenId; //从 session 获取open_id

            out_trade_no = req.session.user.member.id + '_' + new Date().valueOf();
            trade_type = "JSAPI";
            order = {
              body: body,
              attach: attach,
              out_trade_no: out_trade_no,
              total_fee: total_fee,
              spbill_create_ip: spbill_create_ip,
              openid: openid,
              trade_type: trade_type
            };
            _context.next = 17;
            return getBrandWCPayRequestParams(order);

          case 17:
            payargs = _context.sent;

            respData.data = payargs;

            //添加一条wechatPayment 记录
            resp = requestHelper.post({
              "moduleName": "hulk_service",
              "controller": "wechatPayment",
              "action": "create",
              "data": {
                memberId: memberId,
                appid: appid,
                body: body,
                mch_id: mch_id,
                notify_url: notify_url,
                openid: openid,
                out_trade_no: out_trade_no,
                spbill_create_ip: spbill_create_ip,
                total_fee: total_fee,
                trade_type: trade_type,
                attach: attach,
                nonce_str: payargs.nonce_str
              }
            });
            return _context.abrupt('return', res.json(respData));

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](1);

            _logger2.default.error("wechat_getPrePayInfo_error:" + (0, _stringify2.default)(_context.t0));
            respData.status = "0";
            respData.message = "获取统一下单信息失败";
            respData.data = null;
            res.json(respData);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 23]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=wechat.js.map