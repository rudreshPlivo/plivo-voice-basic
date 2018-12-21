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
    console.log("xml request called");
    var response = plivo.Response();
    var speakBody = "please wait while we connect you to doctor";
    var playBody = "https://s3.amazonaws.com/plivocloud/Trumpet.mp3";
    //response.addSpeak(speakBody);

    //number to be dialled
    var dialNumber = '919825082101';

    //first add the play tag 
    response.addPlay(playBody);

    //add dial and number tags <Dial><Number>dialNumber</Number></Dial>
    var dial = response.addDial();
    dial.addNumber(dialNumber);

    console.log("response XML ready");
    console.log(response.toXML());
    try {
        res.type('application/xml');
        res.send(response.toXML());
    } catch (error) {
        console.log("something went wrong with answer url error - " + error);
        next(error);
    }
});

exports.default = router;
//# sourceMappingURL=playurl.js.map