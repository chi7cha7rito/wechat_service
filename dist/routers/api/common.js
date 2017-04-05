'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _captchapng = require('captchapng');

var _captchapng2 = _interopRequireDefault(_captchapng);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @desc 生成数字验证码
 */
router.get('/genVerifyCodeImg', function (req, res, next) {
  var verifyCode = parseInt(Math.random() * 9000 + 1000);
  var p = new _captchapng2.default(80, 30, verifyCode); // width,height,numeric captcha 
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });

  // store verify code in session for check 
  req.session.verifyCode = verifyCode;

  res.end(imgbase64);
});

/**
 * @desc 获取短信验证码
 */
router.post('/getSmsCode', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var verifyCode, phoneNo, code, codeResp;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            verifyCode = req.body.verifyCode;
            phoneNo = req.body.phoneNo;
            code = Math.random().toString().slice(-6);


            req.session.smsCode = code;
            req.session.smsCodeGenDate = (0, _moment2.default)().unix();

            if (!(verifyCode && verifyCode != req.session.verifyCode)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', res.json({
              'status': '0',
              'message': '验证码不正确',
              'data': null
            }));

          case 8:
            _context.next = 10;
            return requestHelper.post({
              "moduleName": "sms_service",
              "controller": "sms",
              "action": "verifyCode",
              "data": {
                phoneNo: phoneNo,
                code: code
              }
            });

          case 10:
            codeResp = _context.sent;


            if (codeResp.status == "1" && codeResp.message.length == 0) {
              res.json({
                'status': '1',
                'message': '',
                'data': null
              });
            } else {
              res.json({
                'status': '0',
                'message': '短信获取失败，请稍后再试',
                'data': null
              });
            }

            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);

            _logger2.default.error('api_common_error' + _context.t0);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=common.js.map