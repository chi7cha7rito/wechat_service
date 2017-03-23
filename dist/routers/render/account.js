"use strict";

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

//注册
router.get('/register', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { "title": "在线注册" });

  return res.render("account/register", templateData);
});

//签到
router.get('/signIn', function (req, res, next) {
  var param = {
    req: req,
    matchJavascript: true,
    matchStylesheet: true
  };

  var templateData = _router2.default.getTemplateBasicData(param);

  (0, _assign2.default)(templateData, { "title": "在线签到" });

  return res.render("account/signIn", templateData);
});

module.exports = router;
//# sourceMappingURL=account.js.map