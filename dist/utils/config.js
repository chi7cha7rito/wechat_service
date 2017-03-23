'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _static = require('../../configs/static.json');

var _static2 = _interopRequireDefault(_static);

var _app = require('../../configs/app.json');

var _app2 = _interopRequireDefault(_app);

var _api = require('../../configs/api.json');

var _api2 = _interopRequireDefault(_api);

var _wechat = require('../../configs/wechat.json');

var _wechat2 = _interopRequireDefault(_wechat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取阶段环境全局变量，这个变量的设置方法：
 * 进入命令行，set STAGE_ENV=dev 这样就将STAGE_ENV设置成了dev，可以有如下值：dev | test | sim | prod
 */
var env = process.env.STAGE_ENV;

/**
 * desc:创建config配置的类
 */
/**
 * desc:获取配置项
 */

var Config = function () {
  function Config() {
    (0, _classCallCheck3.default)(this, Config);
  }
  /**
   * desc:获取静态资源路径的方法
   * @param  {} category
   */


  (0, _createClass3.default)(Config, null, [{
    key: 'getStatic',
    value: function getStatic(category) {
      return _static2.default['prefix'] + _static2.default[category];
    }
    /**
     * desc:获取静态资源路径的方法
     * @param  {} name
     * @param  {} key
     */

  }, {
    key: 'getApi',
    value: function getApi(moduleName, controller, action) {
      return _api2.default[moduleName]["domain"][env] + '/' + _api2.default[moduleName][controller][action];
    }

    /**
    * desc:获取当前域名
    * @param  {} name
    * @param  {} key
    */

  }, {
    key: 'getDomain',
    value: function getDomain() {
      return _api2.default['domain'][env];
    }

    /**
     * desc:获取整个应用当前版本
     */

  }, {
    key: 'getAppVersion',
    value: function getAppVersion() {
      return _app2.default.version;
    }

    /**
     * desc 获取请求service token
     */

  }, {
    key: 'getServiceToken',
    value: function getServiceToken() {
      return (0, _md2.default)(_app2.default.soa.token);
    }

    /**
     * desc:获取公共插件的js
     * @param  {Array} plugin
     */

  }, {
    key: 'getPluginJs',
    value: function getPluginJs(plugin) {
      var result = [];
      var router = _static2.default['prefix'][env] + _static2.default['util'];
      var jsConfig = _static2.default['pluginJs'];
      if (Array.isArray(plugin)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(plugin), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;

            if (jsConfig[p]) {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = (0, _getIterator3.default)(jsConfig[p]), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var j = _step2.value;

                  result.push(router + j);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
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
      return result;
    }

    /**
     * desc:获取公共插件的css
     * @param  {Array} plugin
     */

  }, {
    key: 'getPluginCss',
    value: function getPluginCss(plugin) {
      var result = [];
      var router = _static2.default['prefix'][env] + _static2.default['util'];
      var cssConfig = _static2.default['pluginCss'];
      if (Array.isArray(plugin)) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(plugin), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var p = _step3.value;

            if (cssConfig[p]) {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                for (var _iterator4 = (0, _getIterator3.default)(cssConfig[p]), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                  var c = _step4.value;

                  result.push(router + c);
                }
              } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                  }
                } finally {
                  if (_didIteratorError4) {
                    throw _iteratorError4;
                  }
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
      return result;
    }
    /**
     * desc:获取SOA配置
     */

  }, {
    key: 'getSoaConf',
    value: function getSoaConf() {
      var conf = _app2.default['SOA'] || { timeout: 60000, successCode: 200 };
      for (var key in conf) {
        if (!conf[key]) {
          if (key.toLowerCase() == 'timeout') conf[key] = 60000;
          if (key.toLowerCase() == 'successCode') conf[key] = 200;
        }
      }
      return conf;
    }

    /**
     * desc:获取中间件配置
     */

  }, {
    key: 'getMiddlewares',
    value: function getMiddlewares() {
      return _app2.default.middleware;
    }

    /**
     * desc:获取微信的配置信息
     */

  }, {
    key: 'getWechat',
    value: function getWechat() {
      return _wechat2.default;
    }
  }]);
  return Config;
}();

exports.default = Config;
//# sourceMappingURL=config.js.map