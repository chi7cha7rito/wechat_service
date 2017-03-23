"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * desc:创建url解析器类
 */
var UrlParser = function () {
    function UrlParser(urlString) {
        (0, _classCallCheck3.default)(this, UrlParser);

        this.urlObj = _url2.default.parse(urlString, true);
        this.pathSeparator = "/";
    }

    /**
     * desc:获取路径段值
     * @param  {} index:@index指哪一段，从0开始/p/a/t/h 中药取得p就是getSection(0)，要取得a就是getSection(1)
     */


    (0, _createClass3.default)(UrlParser, [{
        key: "getSection",
        value: function getSection(index) {
            var pathNameArray = void 0;
            var pathname = this.urlObj.pathname;
            if (pathname && pathname.length > 1) {
                pathname = pathname.substring(1, pathname.length);
                pathNameArray = pathname.split(this.pathSeparator);
            }
            return pathNameArray.length > index ? pathNameArray[index] : null;
        }
        /**
         * desc:  获取路由模块+控制器名称，格式：account/login
         */

    }, {
        key: "getMCCombined",
        value: function getMCCombined() {
            return this.getSection(0) + this.pathSeparator + this.getSection(1);
        }
    }]);
    return UrlParser;
}(); /**
      * desc:使用url包，具体使用方法参照：https://www.npmjs.com/package/url
      *      @url规则：http://user:pass@host.com:8080/p/a/t/h?query=string#hash
      */


exports.default = UrlParser;
//# sourceMappingURL=urlParser.js.map