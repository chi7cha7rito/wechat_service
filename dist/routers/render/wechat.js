'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _wechat = require('wechat');

var _wechat2 = _interopRequireDefault(_wechat);

var _wechatOauth = require('wechat-oauth');

var _wechatOauth2 = _interopRequireDefault(_wechatOauth);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('../../utils/config');

var _config2 = _interopRequireDefault(_config);

var _wechatPay = require('wechat-pay');

var _wechatPay2 = _interopRequireDefault(_wechatPay);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var wechatConfig = _config2.default.getWechat();

//auth client
var client = new _wechatOauth2.default(wechatConfig.appid, wechatConfig.secret);

// wechat pay unifiedorder 基本参数
var paymentConfig = new _wechatPay2.default.Payment({
  'appId': wechatConfig.appid,
  'mchId': wechatConfig.mch_id,
  'partnerKey': wechatConfig.partnerKey,
  'notifyUrl': wechatConfig.host + '/wechat/notify'
});

// wechat pay notify middleware
var middleware = _wechatPay2.default.middleware;

/**
 * desc:微信验证Token的url
 */
router.all('/', (0, _wechat2.default)(wechatConfig.token, function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var message, open_id, menuOption;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = req.weixin;
            open_id = message.FromUserName;

            // let accessTokenInfo = await requestHelper.get({
            //   "moduleName": "wechat",
            //   "controller": "common",
            //   "action": "getAccessToken",
            //   "data": {
            //     "grant_type": "client_credential",
            //     "appid": wechatConfig.appid,
            //     "secret": wechatConfig.secret
            //   }
            // });

            // console.log(accessTokenInfo)

            // //menu

            menuOption = {
              "button": [{
                "name": "会员服务",
                "sub_button": [{
                  "type": "view",
                  "name": "会员中心",
                  "url": wechatConfig.host + '/personal/list'
                }, {
                  "type": "view",
                  "name": "在线充值",
                  "url": wechatConfig.host + '/pay/wechat'
                }, {
                  "type": "view",
                  "name": "在线签到",
                  "url": wechatConfig.host + '/account/signIn'
                }, {
                  "type": "view",
                  "name": "战绩查询",
                  "url": wechatConfig.host + '/match/result'
                }]
              }, {
                "name": "赛事报名",
                "sub_button": [{
                  "type": "view",
                  "name": "赛事预告",
                  "url": wechatConfig.host + '/match/list'
                }, {
                  "type": "view",
                  "name": "在线报名",
                  "url": wechatConfig.host + '/match/apply'
                }]
              }, {
                "name": "豪客专享",
                "sub_button": [{
                  "type": "view",
                  "name": "贵宾室预定",
                  "url": wechatConfig.host + '/booking/room'
                }, {
                  "type": "view",
                  "name": "豪客风采",
                  "url": wechatConfig.host + '/match/share'
                }]
              }]
            };

            //create Menu
            // let menuResp = await requestHelper.post({
            //   "moduleName": "wechat",
            //   "controller": "common",
            //   "action": "createMenu",
            //   "data": menuOption
            // });

            // console.log(menuResp);

            // res.reply('尚在建设中，请耐心等待！')

            if (message.EventKey == "booking_room") {
              res.reply('贵宾室预定，请拨打电话 <a style="color:#a8a8a8;" href="tel:400-821-5365">400-821-5365</a> ');
            } else {
              res.reply([{
                title: '快来加入豪客俱乐部',
                description: '',
                picurl: 'http://www.holecardsclub.com/images/WechatIMG208.jpeg',
                url: 'http://www.holecardsclub.com/common/intro'
              }]);
            }

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));

/**
 * desc:微信网页授权回调url地址
 */
router.all('/auth', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
    var r_url;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            r_url = req.query.state; //成功操作后的跳转url;

            client.getAccessToken(req.query.code, function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(err, result) {
                var accessToken, openid, memberInfo, accessTokenInfo, userInfo;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        accessToken = result.data.access_token; //网页授权access_token

                        openid = result.data.openid;

                        //将token 信息 存入db

                        _context2.next = 4;
                        return requestHelper.post({
                          "moduleName": "hulk_service",
                          "controller": "wechatToken",
                          "action": "create",
                          "data": {
                            "access_token": accessToken,
                            "openid": openid,
                            "scope": result.data.scope,
                            "expires_in": result.data.expires_in
                          }
                        });

                      case 4:
                        _context2.next = 6;
                        return requestHelper.get({
                          "moduleName": "hulk_service",
                          "controller": "member",
                          "action": "find",
                          "data": {
                            "wechatOpenId": openid
                          }
                        });

                      case 6:
                        memberInfo = _context2.sent;

                        if (memberInfo.data) {
                          _context2.next = 18;
                          break;
                        }

                        _context2.next = 10;
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

                      case 10:
                        accessTokenInfo = _context2.sent;
                        _context2.next = 13;
                        return requestHelper.get({
                          "moduleName": "wechat",
                          "controller": "common",
                          "action": "getUserInfo",
                          "data": {
                            "access_token": accessTokenInfo.access_token,
                            "openid": openid
                          }
                        });

                      case 13:
                        userInfo = _context2.sent;


                        //存入session
                        req.session.wechatUser = userInfo;

                        return _context2.abrupt('return', res.redirect('/account/register?returnUrl=' + r_url));

                      case 18:
                        req.session.user = memberInfo.data;

                        return _context2.abrupt('return', res.redirect(r_url));

                      case 20:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x7, _x8) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

/**
 * desc:接收微信支付回调请求
 * @see https://api.mch.weixin.qq.com/pay/unifiedorder
 */
router.all('/notify', middleware(paymentConfig).getNotify().done(function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(message, req, res, next) {
    var openid, out_trade_no, memberId, notifyTotalFee, notifySign, tmpParmas, payInfo, sortedQueryString, stringSignTemp, newSign, transaction_id, time_end, status, notifyInfo;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            openid = message.openid;
            out_trade_no = message.out_trade_no; //订单号

            memberId = message.attach;
            notifyTotalFee = message.total_fee;
            notifySign = message.sign;
            tmpParmas = _lodash2.default.clone(message);

            //先查询

            _context4.next = 9;
            return requestHelper.get({
              "moduleName": "hulk_service",
              "controller": "wechatPayment",
              "action": "find",
              "data": {
                "memberId": memberId,
                "out_trade_no": out_trade_no
              }
            });

          case 9:
            payInfo = _context4.sent;

            if (!(payInfo && payInfo.data)) {
              _context4.next = 26;
              break;
            }

            delete tmpParmas.sign;
            sortedQueryString = paymentConfig._toQueryString(tmpParmas);
            stringSignTemp = sortedQueryString + '&key=' + wechatConfig.partnerKey;
            newSign = (0, _md2.default)(stringSignTemp).toUpperCase();

            //签名验证,并校验返回的订单金额是否与商户侧的订单金额一致

            if (!(payInfo.data.total_fee == notifyTotalFee && newSign == notifySign)) {
              _context4.next = 25;
              break;
            }

            //更新payment row status 
            transaction_id = message.transaction_id;
            time_end = message.time_end;
            status = "2";
            _context4.next = 21;
            return requestHelper.post({
              "moduleName": "hulk_service",
              "controller": "wechatPayment",
              "action": "notify",
              "data": {
                out_trade_no: out_trade_no,
                transaction_id: transaction_id,
                time_end: time_end,
                status: status
              }
            });

          case 21:
            notifyInfo = _context4.sent;


            if (notifyInfo.status == "1" && !notifyInfo.message) {
              /**
              * 查询订单，在自己系统里把订单标为已处理
              * 如果订单之前已经处理过了直接返回成功
              */
              res.reply('success');
            } else {
              /**
              * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
              * res.reply(new Error('...'))
              */
              res.reply(new Error('订单更新失败'));
            }
            _context4.next = 26;
            break;

          case 25:
            /**
            * 有错误返回错误，不然微信会在一段时间里以一定频次请求你
            * res.reply(new Error('...'))
            */
            res.reply(new Error('回调信息有误'));

          case 26:
            _context4.next = 31;
            break;

          case 28:
            _context4.prev = 28;
            _context4.t0 = _context4['catch'](0);

            _logger2.default.error('wechat_notify_error' + _context4.t0);

          case 31:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 28]]);
  }));

  return function (_x9, _x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}()));

module.exports = router;
//# sourceMappingURL=wechat.js.map