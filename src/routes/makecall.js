import express from "express";
import env from "./../config/env";
import * as plivo from "plivo";

const router = express.Router();

router.post('/',(req,res,next) => {
    //call api
    console.log(JSON.stringify(req.body));
    
    const callData = req.body;
    var toNumber = callData.toNumber;
    var fromNumber = callData.fromNumber;
    var answerUrl = `https://pl-voice.herokuapp.com/playurl`;

    try {
        var client = new plivo.CLient(env.AUTH_ID,env.AUTH_TOKEN);
        client.calls.create(
            fromNumber,
            toNumber,
            answerUrl
        )
        .then((response) => {
            console.log(`Success: response from plivo is - ${response}`);
            res.json({
                msg: "call initiated"
            });
        })
        .catch((err) => {
            console.log(`something went wrong with plivo - ${err}`);
            res.json({
                error: err
            });
        });
    } catch (error) {
        
    }

});

export default router;