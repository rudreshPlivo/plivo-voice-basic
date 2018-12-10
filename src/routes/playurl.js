import express from "express";
import env from "./../config/env";
import * as plivo from "plivo";

const router = express.Router();

router.post('/',(req,res,next)=> {
    var response = plivo.Response();
    var speakBody = `This call will be terminated in next few seconds`;
    response.addSpeak(speakBody);
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