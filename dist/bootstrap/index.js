'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    //注册app全局配置
    (0, _globalSettings2.default)(app);
    //注册全局中间件
    (0, _globalMiddlewares2.default)(app);
    //注册路由
    (0, _routerRegister2.default)(app);
};

var _globalSettings = require('./globalSettings');

var _globalSettings2 = _interopRequireDefault(_globalSettings);

var _globalMiddlewares = require('./globalMiddlewares');

var _globalMiddlewares2 = _interopRequireDefault(_globalMiddlewares);

var _routerRegister = require('./routerRegister');

var _routerRegister2 = _interopRequireDefault(_routerRegister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map