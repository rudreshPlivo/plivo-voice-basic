"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _env = require("./config/env");

var _env2 = _interopRequireDefault(_env);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _makecall = require("./routes/makecall");

var _makecall2 = _interopRequireDefault(_makecall);

var _playurl = require("./routes/playurl");

var _playurl2 = _interopRequireDefault(_playurl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = _env2.default.PORT;

//set view engine
app.set('view engine', 'ejs');
app.set('views', _path2.default.join(__dirname, 'views'));

//logger
app.use((0, _morgan2.default)("combined"));

//bodyparser
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

//static folder 
var staticpath = _path2.default.join(__dirname, './../static');
app.use(_express2.default.static(staticpath));

//routes
app.use('/makecall', _makecall2.default);
app.use('/playurl', _playurl2.default);

//handle root path

app.get('/', function (req, res) {
    try {
        res.render('index');
    } catch (error) {
        console.log("error in root is - " + error);
        res.json({
            msg: "something went wrong"
        });
    }
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // add this line to include winston logging
    //console.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    next(err);
});

//start server

app.listen(PORT, function () {
    console.log("listening on port - " + PORT);
});
//# sourceMappingURL=app.js.map