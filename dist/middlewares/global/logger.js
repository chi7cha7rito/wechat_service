'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (req, res, next) {
  // req.session.member = {member: {id: 1}}
  req.app.locals.log = _logger2.default;
  _logger2.default.info('=======request_url=======:' + req.url + ' ');
  // logger.info(`request_headers:${JSON.stringify(req.headers)}`)
  switch (req.method) {
    case 'POST':
      _logger2.default.info('request_params:' + (0, _stringify2.default)(req.body));
      break;
    case 'GET':
      _logger2.default.info('request_params:' + (0, _stringify2.default)(req.query));
      break;
    default:
      _logger2.default.warn('invalid request!');
      next(new Error('invalid request!'));
      break;
  }
  next();
};

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=logger.js.map