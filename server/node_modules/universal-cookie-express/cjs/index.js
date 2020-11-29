"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = universalCookieMiddleware;

var _universalCookie = _interopRequireDefault(require("universal-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-ignore
function universalCookieMiddleware() {
  return function (req, res, next) {
    req.universalCookies = new _universalCookie["default"](req.headers.cookie || '');
    req.universalCookies.addChangeListener(function (change) {
      if (!res.cookie || res.headersSent) {
        return;
      }

      if (change.value === undefined) {
        res.clearCookie(change.name, change.options);
      } else {
        var expressOpt = Object.assign({}, change.options);

        if (expressOpt.maxAge && change.options && change.options.maxAge) {
          // the standard for maxAge is seconds but express uses milliseconds
          expressOpt.maxAge = change.options.maxAge * 1000;
        }

        res.cookie(change.name, change.value, expressOpt);
      }
    });
    next();
  };
}

module.exports = exports.default;