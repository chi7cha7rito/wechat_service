'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _router = require('../../utils/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @desc 贵宾室预定
 */
router.get('/room', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
    var param, templateData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            param = {
              req: req,
              matchJavascript: true,
              matchStylesheet: true
            };
            templateData = _router2.default.getTemplateBasicData(param);


            (0, _assign2.default)(templateData, { 'title': '贵宾室预定' });

            return _context.abrupt('return', res.render('booking/room', templateData));

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            _logger2.default.error('render_booking_room_error=>' + (0, _stringify2.default)(_context.t0));
            return _context.abrupt('return', res.render('common/error'));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=booking.js.map