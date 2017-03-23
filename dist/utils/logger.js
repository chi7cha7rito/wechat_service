"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _log4js3 = require("../../configs/log4js.json");

var _log4js4 = _interopRequireDefault(_log4js3);

var _app = require("../../configs/app.json");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appName = _app2.default["name"];

//创建log的目录
/**
 * author:luwei@lifang.com
 * desc:logger工具类
 */
var appenders = _log4js4.default.appenders;
if (appenders) {
    var baseDir = _path2.default.join(__dirname, "..", "..", "..", "logs");
    if (!_fs2.default.existsSync(baseDir)) {
        _fs2.default.mkdirSync(baseDir);
    }

    var logDir = _path2.default.join(__dirname, "..", "..", "..", "logs", appName);
    if (!_fs2.default.existsSync(logDir)) {
        _fs2.default.mkdirSync(logDir);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(appenders), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var a = _step.value;

            if (a.type && a.type == "dateFile") {
                var dir = _path2.default.join(__dirname, "..", "..", a.filename);
                if (!_fs2.default.existsSync(dir)) {
                    _fs2.default.mkdirSync(dir);
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

//加载log4js的配置
_log4js2.default.configure(_log4js4.default);

/**
 * desc:logger工具类
 */

var LoggerUtil = function () {
    function LoggerUtil() {
        (0, _classCallCheck3.default)(this, LoggerUtil);
    }

    /**
     * 获取不同类型logger的实例
     */


    (0, _createClass3.default)(LoggerUtil, null, [{
        key: "info",


        /**
         * desc:记录info
         * @param  {String} info
         */
        value: function info(_info) {
            if (_info) this.loggerInfo.info(_info);
        }

        /**
         * desc:记录error
         * @param  {String} error
         */

    }, {
        key: "error",
        value: function error(_error) {
            if (_error) this.loggerError.error(_error);
        }
        /**
         * desc:记录warning
         * @param  {String} warn
         */

    }, {
        key: "warn",
        value: function warn(_warn) {
            if (_warn) this.loggerWarn.warn(_warn);
        }
    }]);
    return LoggerUtil;
}();

LoggerUtil.loggerInfo = _log4js2.default.getLogger('info');
LoggerUtil.loggerError = _log4js2.default.getLogger('error');
LoggerUtil.loggerWarn = _log4js2.default.getLogger('warn');
exports.default = LoggerUtil;
//# sourceMappingURL=logger.js.map