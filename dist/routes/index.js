"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _middleware = require("../middleware");

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require("../db");

var _db2 = _interopRequireDefault(_db);

var _vaultDragonObject = require("../controller/vaultDragonObject");

var _vaultDragonObject2 = _interopRequireDefault(_vaultDragonObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*============= IMPORT FROM INTERNAL MODULES =================*/
var router = (0, _express2.default)();

/*============= CONNECT TO DATABASE ==========================*/
/*============= IMPORT FROM PACKAGES =========================*/
(0, _db2.default)(function (db) {

	//internal middleware
	router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

	//api endpoint vaultDragon(/vaultDragonObject)
	router.use("/vaultDragonObject", (0, _vaultDragonObject2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map