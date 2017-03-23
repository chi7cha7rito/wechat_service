"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  /**
   * desc:设置阶段环境
   */
  var stageEnv = process.env.STAGE_ENV || 'dev';
  app.set('stage_env', stageEnv);

  global.requestHelper = new _request2.default();

  /**
   * desc:模板目录及引擎设置 
   * 设置模板的访问路径，__dirname是node.js里面的全局变量，即取得执行的js所在的路径
   * 设置应用的模板模板引擎为handlebars，渲染模板的时候就可以不带模板文件扩展名，默认为hbs
   */
  app.set("views", _path2.default.join(__dirname, "..", "..", "views"));
  app.set("view engine", "ejs");
};

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _api = require("../../configs/api.json");

var _api2 = _interopRequireDefault(_api);

var _request = require("../utils/request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=globalSettings.js.map