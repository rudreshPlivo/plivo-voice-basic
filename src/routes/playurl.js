import express from "express";
import env from "./../config/env";
import * as plivo from "plivo";

const router = express.Router();

router.post('/',(req,res,next)=> {
    console.log(`xml request called`);
    var response = plivo.Response();
    var speakBody = `This call will be terminated in next few seconds`;
    var playBody = `https://s3.amazonaws.com/plivocloud/Trumpet.mp3`;
    //response.addSpeak(speakBody);

    //number to be dialled
    var dialNumber = '916355456975';

    //first add the play tag 
    response.addPlay(playBody);

    //add dial and number tags <Dial><Number>dialNumber</Number></Dial>
    var dial = response.addDial();
    dial.addNumber(dialNumber);
    
    console.log(`response XML ready`);
    console.log(response.toXML());
    try {
        res.type('application/xml');
        res.send(response.toXML());
    } catch (error) {
        console.log(`something went wrong with answer url error - ${error}`);
        next(error);
    }
});

export default router;