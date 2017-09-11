"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*============= IMPORT FROM INTERNAL MODULE ==================*/
var app = (0, _express2.default)(); /*============= IMPORT FROM PACKAGES =========================*/

app.server = _http2.default.createServer(app);

/*============== MIDDLEWARE ==================================*/
app.use((0, _morgan2.default)('dev')); //to log the path in dev

/*============== parse application json ======================*/
app.use(_bodyParser2.default.json({
	limit: _config2.default.bodyLimit
}));

/*============= PASSPORT CONFIG ==============================*/

/*============= API ENDPOINT =================================*/
app.use(_routes2.default);

/*============= LAUNCH THE SERVER ============================*/
app.server.listen(_config2.default.port);
console.log("Server started on port " + app.server.address().port + " ");

exports.default = app;
//# sourceMappingURL=index.js.map