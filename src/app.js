import express from "express";
import env from "./config/env";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import makecall from "./routes/makecall";

const app = express();
const PORT = env.PORT;

//set view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//logger
app.use(morgan("combined"));

//bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.use('/makecall',makecall);

//static folder 
const staticpath = path.join(__dirname,'./../static');
app.use(express.static(staticpath));

//handle root path

app.get('/',(req,res) => {
    try {
        res.render('index');
    } catch (error) {
        console.log(`error in root is - ${error}`);
        res.json({
            msg: "something went wrong"
        });
    }
});

// error handler
app.use(function(err, req, res, next) {
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

  app.listen(PORT,() => {
      console.log(`listening on port - ${PORT}`);
  });