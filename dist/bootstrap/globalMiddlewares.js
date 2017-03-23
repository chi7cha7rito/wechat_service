'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (app) {
  /**
   * desc:bodyParser是Connect內建的middleware，下面先加载这个中间件
   * 设置此处可以将client提交过来的post请求放入request.body中。
   */

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));

  /**
   * desc:将请求的cookie都解析出来
   */
  app.use((0, _cookieParser2.default)());

  /**
   * desc:配置session
   */
  app.use((0, _expressSession2.default)({
    secret: _app2.default.session.secret,
    cookie: _app2.default.session.timeout,
    resave: false,
    saveUninitialized: true
  }));

  /**
  * desc:注册全局中间件到app中
  */
  if (_lodash2.default.isArray(middlewaresConfig.global) && middlewaresConfig.global.length) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(middlewaresConfig.global), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var c = _step.value;

        if (_lodash2.default.isFunction(middlewares[c]['default'])) app.use(middlewares[c]['default']);
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
};

var _loader = require('../utils/loader');

var _loader2 = _interopRequireDefault(_loader);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _config = require('../utils/config');

var _config2 = _interopRequireDefault(_config);

var _app = require('../../configs/app');

var _app2 = _interopRequireDefault(_app);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = _loader2.default.getModules('middlewares/global');
var middlewaresConfig = _config2.default.getMiddlewares();
//# sourceMappingURL=globalMiddlewares.js.map