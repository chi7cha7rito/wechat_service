"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _logger = require("../../utils/logger");

var _logger2 = _interopRequireDefault(_logger);

var _router = require("../../utils/router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//比赛报名
router.get('/apply', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { "title": "赛事汇总" });

  return res.render("match/apply", templateData);
});

//赛事奖励
router.get('/rewards', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var param, rewards, templateData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            param = {
              req: req,
              matchJavascript: false,
              matchStylesheet: true
            };
            _context.next = 4;
            return requestHelper.get({
              'moduleName': 'hulk_service',
              'controller': 'match',
              'action': 'rewards',
              'data': { matchConfigId: req.query.matchConfigId }
            });

          case 4:
            rewards = _context.sent;
            templateData = _router2.default.getTemplateBasicData(param);


            (0, _assign2.default)(templateData, { "title": "赛事奖励" }, { rewards: rewards.data, matchName: req.query.matchName });

            return _context.abrupt("return", res.render("match/rewards", templateData));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);

            logger.error("render_personal_list_error=>" + (0, _stringify2.default)(e));
            return _context.abrupt("return", res.render('common/error'));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

//比赛成绩
router.get('/result', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { "title": "战绩" });

  return res.render("match/result", templateData);
});

/**
 * @desc 赛事分享--豪客风采
 */
router.get('/share', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
    var param, templateData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            param = {
              req: req,
              matchJavascript: true,
              matchStylesheet: true
            };
            templateData = _router2.default.getTemplateBasicData(param);


            (0, _assign2.default)(templateData, { "title": "豪客风采" });

            return _context2.abrupt("return", res.render("match/share", templateData));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=match.js.map