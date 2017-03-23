"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _urlParser = require("./urlParser");

var _urlParser2 = _interopRequireDefault(_urlParser);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * desc:定义Router类
 */
/**
 * desc:工具 -> 解决路由页面匹配路由的样式及脚本名称获取，以及路由页面基础模板数据的获得等问题  
 */
var Router = function () {
    function Router() {
        (0, _classCallCheck3.default)(this, Router);
    }

    /**
     * @param  {} req
     * @param  {boolean} matchStylesheet
     * @param  {boolean} matchJavascript
     */


    (0, _createClass3.default)(Router, null, [{
        key: "getTemplateBasicData",
        value: function getTemplateBasicData(_ref) {
            var req = _ref.req,
                _ref$matchStylesheet = _ref.matchStylesheet,
                matchStylesheet = _ref$matchStylesheet === undefined ? false : _ref$matchStylesheet,
                _ref$matchJavascript = _ref.matchJavascript,
                matchJavascript = _ref$matchJavascript === undefined ? false : _ref$matchJavascript,
                extraJavascripts = _ref.extraJavascripts,
                extraStylesheets = _ref.extraStylesheets,
                redirectUrl = _ref.redirectUrl;

            //获取配置项，将静态资源路径变量加到模板变量中
            var up = new _urlParser2.default(req.originalUrl);
            var MCCombined = up.getMCCombined();
            var templateData = {
                version: _config2.default.getAppVersion(),
                appStaticPrefix: _config2.default.getStatic("app"), //应用类静态资源路径前缀
                matchStylesheet: matchStylesheet ? MCCombined : "", //匹配路由的样式表文件
                matchJavascript: matchJavascript ? MCCombined : "", //匹配路由的脚本文件
                extraStylesheets: Array.isArray(extraStylesheets) ? _config2.default.getPluginCss(extraStylesheets) : [], //除了公共stylesheet以及matchStylesheet之外还需要的样式表
                extraJavascripts: Array.isArray(extraJavascripts) ? _config2.default.getPluginJs(extraJavascripts) : [], //除了公共脚本以及matchJavascript还需要的脚本文件
                redirectUrl: redirectUrl
            };
            return templateData;
        }
    }]);
    return Router;
}();

exports.default = Router;
//# sourceMappingURL=router.js.map