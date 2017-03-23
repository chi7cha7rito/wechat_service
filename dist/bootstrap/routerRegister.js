'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (app) {
  var renderRoutes = routers.render;
  var apiRoutes = routers.api;
  var debugRoutes = routers.debug;

  // 添加 render routers
  (0, _keys2.default)(renderRoutes).forEach(function (key) {
    if (key === 'home') app.use('/', [].concat(renderMiddlewares, [renderRoutes[key]])); // 如果是home添加'/'路由支持
    app.use('/' + key, [].concat(renderMiddlewares, [renderRoutes[key]]));
  });

  // 添加 api routers
  if (apiRoutes) {
    (0, _keys2.default)(apiRoutes).forEach(function (key) {
      app.use('/api/' + key, [].concat(apiMiddlewares, [apiRoutes[key]]));
    });
  }
};

var _loader = require('../utils/loader');

var _loader2 = _interopRequireDefault(_loader);

var _config = require('../utils/config');

var _config2 = _interopRequireDefault(_config);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _wechatPay = require('wechat-pay');

var _wechatPay2 = _interopRequireDefault(_wechatPay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * desc:加载router
 */
/**
 * desc:注册路由与路由中间件
 * author:luwei@lifang.com
 */

var routers = _loader2.default.getModules('routers');

/**
 * desc:加载middlewares
 */
var middlewaresConfig = _config2.default.getMiddlewares();
var renderModules = _loader2.default.getModules('middlewares/render');
var apiModules = _loader2.default.getModules('middlewares/api');

var renderMiddlewares = [];
var apiMiddlewares = [];

var stageEnv = process.env.STAGE_ENV || 'dev';

/**
 * desc:根据app.json中middlewares配置顺序组装api中间件
 */
if (_lodash2.default.isArray(middlewaresConfig.api) && middlewaresConfig.api.length) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(middlewaresConfig.api), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var c = _step.value;

      if (_lodash2.default.isFunction(apiModules[c]['default'])) apiMiddlewares.push(apiModules[c]['default']);
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

/**
 * desc:根据app.json中middlewares配置顺序组装reder中间件
 */
if (_lodash2.default.isArray(middlewaresConfig.render) && middlewaresConfig.render.length) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(middlewaresConfig.render), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _c = _step2.value;

      if (_lodash2.default.isFunction(renderModules[_c]['default'])) renderMiddlewares.push(renderModules[_c]['default']);
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
//# sourceMappingURL=routerRegister.js.map