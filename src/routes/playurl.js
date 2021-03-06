import express from "express";
import env from "./../config/env";
import * as plivo from "plivo";

const router = express.Router();

router.post('/',(req,res,next)=> {
    
    var response = plivo.Response();
    var speakBody = `please wait while we connect you to patient`;
    var playBody = `https://s3.amazonaws.com/plivocloud/Trumpet.mp3`;
    //response.addSpeak(speakBody);

    //number to be dialled
    var dialNumber = '11111111111';

    //first add the play tag 
    //response.addPlay(playBody);

    //add speak tag
    response.addSpeak(speakBody);

    //add dial and number tags <Dial><Number>dialNumber</Number></Dial>
    var dial = response.addDial();
    dial.addNumber(dialNumber);

    
    
    
    try {
        res.type('application/xml');
        res.send(response.toXML());
    } catch (error) {
        console.log(`something went wrong with answer url error - ${error}`);
        next(error);
    }
});

export default router;