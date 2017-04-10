'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/list', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var param, templateData, memberId, totalInfo, memberInfo;
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
            memberId = req.session.user.member.id;
            _context.next = 6;
            return requestHelper.get({
              'moduleName': 'hulk_service',
              'controller': 'member',
              'action': 'findTotal',
              'data': { memberId: memberId }
            });

          case 6:
            totalInfo = _context.sent;
            _context.next = 9;
            return requestHelper.get({
              'moduleName': 'hulk_service',
              'controller': 'member',
              'action': 'find',
              'data': { wechatOpenId: req.session.user.member.wechat.wechatOpenId }
            });

          case 9:
            memberInfo = _context.sent;

            req.session.user = memberInfo.data;
            (0, _assign2.default)(templateData, { 'title': '个人中心' }, {
              balance: totalInfo.data && totalInfo.data.balance || 0,
              points: totalInfo.data && totalInfo.data.points || 0,
              nickName: req.session.user.member.wechat.nickName,
              headImgUrl: req.session.user.member.wechat.headImgUrl,
              level: memberInfo.data.member.memberLevel.name
            });

            return _context.abrupt('return', res.render('personal/list', templateData));

          case 15:
            _context.prev = 15;
            _context.t0 = _context['catch'](0);

            _logger2.default.error('render_personal_list_error=>' + (0, _stringify2.default)(_context.t0));
            return _context.abrupt('return', res.render('common/error'));

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

// 消费记录
router.get('/balance', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { 'title': '帐户明细' });

  return res.render('personal/balance', templateData);
});

// 个人信息
router.get('/info', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { 'title': '个人信息' }, {
    "name": req.session.user.name,
    "idCardNo": req.session.user.idCardNo,
    "phoneNo": req.session.user.phoneNo,
    "level": req.session.user.member.memberLevel.name
  });

  return res.render('personal/info', templateData);
});

// 积分记录
router.get('/credits', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { 'title': '积分明细' });

  return res.render('personal/credits', templateData);
});

//我的优惠券
router.get('/coupon', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { 'title': '我的优惠券' });

  return res.render('personal/coupon', templateData);
});

module.exports = router;
//# sourceMappingURL=personal.js.map