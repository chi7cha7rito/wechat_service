'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('../utils/config');

var _config2 = _interopRequireDefault(_config);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service_Token = _config2.default.getServiceToken();

var Http_Request = function () {
    function Http_Request() {
        (0, _classCallCheck3.default)(this, Http_Request);
    }

    (0, _createClass3.default)(Http_Request, [{
        key: 'get',


        /**
         * @param  {} module
         * @param  {} name
         * @param  {} data
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
                var moduleName = _ref2.moduleName,
                    controller = _ref2.controller,
                    action = _ref2.action,
                    data = _ref2.data;
                var resp, uri, options;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                resp = void 0;
                                uri = _config2.default.getApi(moduleName, controller, action);
                                options = {
                                    method: "GET",
                                    uri: uri,
                                    qs: data,
                                    json: true,
                                    headers: {
                                        "hulk_token": service_Token
                                    }
                                };

                                //目前只有调用hulk_service 需要headers 加入 token

                                if (moduleName != "hulk_service") {
                                    delete options.headers;
                                }

                                _logger2.default.info(moduleName + '_' + controller + '_' + action + '_request_data:' + (0, _stringify2.default)(options));

                                _context.next = 8;
                                return (0, _requestPromise2.default)(options);

                            case 8:
                                resp = _context.sent;


                                _logger2.default.info(moduleName + '_' + controller + '_' + action + '_response_data:' + (0, _stringify2.default)(resp));

                                return _context.abrupt('return', resp);

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](0);

                                _logger2.default.error(moduleName + '_' + controller + '_' + action + '_error:' + (0, _stringify2.default)(_context.t0));

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 13]]);
            }));

            function get(_x) {
                return _ref.apply(this, arguments);
            }

            return get;
        }()
        /**
         * @param  {} module
         * @param  {} action
         * @param  {} contentType
         * @param  {} data
         */

    }, {
        key: 'post',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
                var moduleName = _ref4.moduleName,
                    controller = _ref4.controller,
                    action = _ref4.action,
                    data = _ref4.data,
                    _ref4$contentType = _ref4.contentType,
                    contentType = _ref4$contentType === undefined ? "application/json" : _ref4$contentType;
                var resp, uri, options;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                resp = void 0;
                                uri = _config2.default.getApi(moduleName, controller, action);
                                options = {
                                    headers: {
                                        "hulk_token": service_Token,
                                        "Content-Type": contentType
                                    },
                                    method: "POST",
                                    uri: uri,
                                    body: data,
                                    json: true
                                };

                                //目前只有调用hulk_service 需要headers 加入 token

                                if (moduleName != "hulk_service") {
                                    delete options.headers.token;
                                }

                                _logger2.default.info(moduleName + '_' + controller + '_' + action + '_request_data:' + (0, _stringify2.default)(options));

                                _context2.next = 8;
                                return (0, _requestPromise2.default)(options);

                            case 8:
                                resp = _context2.sent;


                                _logger2.default.info(moduleName + '_' + controller + '_' + action + '_response_data:' + (0, _stringify2.default)(resp));

                                return _context2.abrupt('return', resp);

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2['catch'](0);

                                _logger2.default.error(moduleName + '_' + controller + '_' + action + '_error:' + (0, _stringify2.default)(_context2.t0));

                            case 16:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 13]]);
            }));

            function post(_x2) {
                return _ref3.apply(this, arguments);
            }

            return post;
        }()
    }]);
    return Http_Request;
}();

exports.default = Http_Request;
//# sourceMappingURL=request.js.map