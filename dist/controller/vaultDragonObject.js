"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _vaultDragonObject = require("../model/vaultDragonObject");

var _vaultDragonObject2 = _interopRequireDefault(_vaultDragonObject);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;


	var api = (0, _express.Router)();

	/*======================= CREATE ====================================*/

	//"/vaultDragonObject" -Post
	api.post("/", function (req, res) {

		var newVaulDragonObject = new _vaultDragonObject2.default();

		//Take the current key
		var myKey = Object.keys(req.body)[0];
		//take the value of the dynamic key
		var myValue = req.body[myKey];
		//timestamp
		var time = Date.now();

		newVaulDragonObject.key = myKey;
		newVaulDragonObject.value = myValue;
		newVaulDragonObject.time = time;

		newVaulDragonObject.save(function (err) {
			if (err) res.json({ 'ERROR': err });

			res.json({ key: myKey, value: myValue, timestamp: time });
		});
	});

	/*======================= READ =====================================*/

	//"/vaultDragonObject" - Read all (get)
	api.get("/", function (req, res) {
		_vaultDragonObject2.default.find({}, function (err, vaultDragonObjects) {

			if (err) res.json({ 'ERROR': err });
			//Print out all the object in the db if there is no error
			res.json(vaultDragonObjects);
		});
	});

	//"/vaultDragonObject/:myKey?timestamp" 
	api.get("/:myKey?timestamp", function (req, res) {

		//the query from the key in the Url
		var query = { key: req.params.myKey };
		var time = req.params.timestamp;

		console.log("The time" + time);

		//to precise that I only need the value field
		var field = { value: 1, _id: 0 };
	});

	//"/vaultDragonObject/:myKey" -Read 1 (get)
	api.get('/:myKey', function (req, res) {

		//the query from the key in the Url
		var query = { key: req.params.myKey };

		//to precise that I only need the value field
		var field = { value: 1, _id: 0 };

		var mySort = { time: -1 };

		_vaultDragonObject2.default.findOne(query, field).sort(mySort).exec(function (err, vaultDragonObject) {
			if (err) res.json({ 'ERROR': err });

			//Print out the object if there is no error
			//res.json({value :vaultDragonObject.value});
			res.json(vaultDragonObject);
		});
	});

	/*======================= UPDATE =====================================*/

	//"/vaultDragon/:id"  -Put
	api.put("/:id", function (req, res) {
		_vaultDragonObject2.default.findById(req.params.id, function (err, vaultDragonObject) {
			if (err) res.json({ 'ERROR': err });

			//update the value
			vaultDragonObject.mykey = req.body.mykey;

			vaultDragonObject.save(function (err) {
				if (err) res.json({ 'ERROR': err });

				//If no error I send the Item updated
				res.json(vaultDragonObject);
			});
		});
	});

	/*======================= DELETE =====================================*/
	//Not required from Vault Dragon
	api.delete("/:id", function (req, res) {
		_vaultDragonObject2.default.remove({
			_id: req.params.id
		}, function (err, vaultDragonObject) {
			if (err) res.json({ 'ERROR': err });

			//send a json mesage to inform that the object has been removed
			res.json({ mesage: "Object successfully removed!" });
		});
	});

	return api;
};
//# sourceMappingURL=vaultDragonObject.js.map