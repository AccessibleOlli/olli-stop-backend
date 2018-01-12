const express = require('express');
const twilio = require('twilio');
const watson_conversation = require('../services/watson_conversation');
const watson_tokens = require('../services/watson_tokens');
const watson_tts = require('../services/watson_tts');

var config = {
  username: process.env.WATSON_SPEECH_TO_TEXT_USERNAME,
  password: process.env.WATSON_SPEECH_TO_TEXT_PASSWORD
};
var router = express.Router();

var twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

router.get('/stt/token', (req, res, next) => {
  watson_tokens.get_token(config.username, config.password, "https://stream.watsonplatform.net/speech-to-text/api")
    .then((token) => {
      res.json({token: token});
    }).catch((err) => {
      res.status(400).json({ error: "Couldn't fetch watson token" });
    });
});

router.post('/conversation/converse', (req, res, next) => {
  console.log('/conversation/converse');
  let msg = req.body;
  let currentTime = Date.now();
  watson_conversation.message(msg.text).then((response) => {
    var dialogResponse = response.output.text.toString();
    var responseObj = {
      response: dialogResponse,
      shouldEndSession: true,
      expressiveness: 'normal',
      responseTime: Date.now() - currentTime,
      expertise: 'echo',
      card: response.card
    };
    if (msg.skipTTS) {
      res.json(responseObj);
    }
    else {
      watson_tts.textToSpeech({ text: dialogResponse }).then((transcript) => {
        responseObj['voice'] = transcript.toString('base64');
        res.json(responseObj);
        //socket.emit('converseResponse', responseObj);
        //socket.emit('conversationSpeech', transcript);
      });
    }
  }).catch(function (err) {
    console.log(err);
    res.status(400).json({ error: "converseError" });
  });
});

router.post('/text', (req, res, next) => {
  console.log('/text');
  let phoneNumber = req.body.phoneNumber;
  let text = req.body.text;
  twilioClient.messages.create({
      body: text,
      to: phoneNumber,
      from: twilioPhoneNumber
  }).then((message) => {
      res.json({
        ok: true
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        ok: false
      });
    });
});

router.post('/kintrans', (req, res, next) => {
  let websocketMgr = req.app.get('websocketMgr');
  console.log("MESSAGE FROM KINTRANS IN api.js/kintrans: ");
  console.log(req.body);
  websocketMgr.sendMessageToClients({type: 'kintrans', body: req.body});
  res.json({
    ok: true
  });
});

module.exports = router;