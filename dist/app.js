'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./bootstrap/index');

var _index2 = _interopRequireDefault(_index);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// 静态资源目录注册
app.use('/', _express2.default.static('static'));

(0, _index2.default)(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('common/error', err);
});

module.exports = app;
//# sourceMappingURL=app.js.map