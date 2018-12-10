"use strict";

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
    var response = plivo.Response();
    var speakBody = "This call will be terminated in next few seconds";
    response.addSpeak(speakBody);
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
//# sourceMappingURL=playurl.js.map