'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _requireDirectory = require('require-directory');

var _requireDirectory2 = _interopRequireDefault(_requireDirectory);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function () {
    function Loader() {
        (0, _classCallCheck3.default)(this, Loader);
    }

    (0, _createClass3.default)(Loader, null, [{
        key: 'getModules',


        /**
         * @desc 获取指定目录下的modules 集合
         * @param  {} p:相对于loader的路径
         */
        value: function getModules(p) {
            var newPath = _path2.default.join(__dirname, '..', p);
            if (_fs2.default.existsSync(newPath)) {
                var files = _fs2.default.readdirSync(newPath);
                if (files && files.length) return (0, _requireDirectory2.default)(module, newPath);
            }
            return {};
        }
    }]);
    return Loader;
}(); /**
      * author:yuxiaochen@lifang.com
      * desc:depends on require-diretory package to recursively iterates over specified directory, 
      * require()'ing each file, and returning a nested hash structure containing those modules.
      */

exports.default = Loader;
//# sourceMappingURL=loader.js.map