"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _env = require("./../config/env");

var _env2 = _interopRequireDefault(_env);

var _plivo = require("plivo");

var plivo = _interopRequireWildcard(_plivo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res, next) {
    //call api
    console.log(JSON.stringify(req.body));

    var callData = JSON.stringify(req.body);
    console.log("calldata is " + callData);
    var toNumber = callData.toNumber;
    var fromNumber = callData.fromNumber;
    var answerUrl = "https://pl-voice.herokuapp.com/playurl";

    try {
        console.log("invoking plivo api");
        console.log("toNumber is " + toNumber + " and frmNumber is " + fromNumber);
        var client = new plivo.Client(_env2.default.AUTH_ID, _env2.default.AUTH_TOKEN);
        client.calls.create(fromNumber, toNumber, answerUrl).then(function (response) {
            console.log("Success: response from plivo is - " + response);
            res.json({
                msg: "call initiated"
            });
        }).catch(function (err) {
            console.log("something went wrong with plivo - " + err);
            res.json({
                error: err
            });
        });
    } catch (error) {
        console.log("that didnt work  - " + error);
        next(error);
    }
});

exports.default = router;
//# sourceMappingURL=makecall.js.map