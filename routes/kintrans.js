const express = require('express');
const twilio = require('twilio');
var router = express.Router();

router.post('/', (req, res, next) => {
  let websocketMgr = req.app.get('websocketMgr');
  console.log("MESSAGE FROM KINTRANS kintrans.js/: ");
  console.log(req.body);
  websocketMgr.sendMessageToClients({type: 'kintrans', body: req.body});
  res.json({
    ok: true
  });
});

module.exports = router;