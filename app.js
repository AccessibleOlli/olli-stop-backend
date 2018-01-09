const bodyParser = require('body-parser');
const cfenv = require('cfenv');
const express = require('express');
const path = require('path');
const WebsocketManager = require('./WebsocketManager');

// load env vars
require('dotenv').config();

const api = require('./routes/api');
const index = require('./routes/index');
const kintrans = require('./routes/kintrans');

const appEnv = cfenv.getAppEnv();
const app = express();
const http = require('http').Server(app);
const websocketMgr = new WebsocketManager();

app.set('websocketMgr', websocketMgr);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/kintrans', kintrans);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// start server on the specified port and binding host
http.listen(appEnv.port, appEnv.bind, () => {
  console.log("server starting on " + appEnv.url);
  websocketMgr.start(http);
  websocketMgr.on('start', () => {
      console.log('web socket server running.')
  });
  websocketMgr.on('message', (client, msg) => {
    // TBD
    // if (msg.type == 'ping') {
    //   this.websocketMgr.sendMessageToClient(client, {type: 'ping'});
    // }
  });
});


module.exports = app;
