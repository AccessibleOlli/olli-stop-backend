'use strict';

const uuidV4 = require('uuid/v4');

class WebsocketClient {

  constructor(connection) {
    this.connection = connection;
    this.id = uuidV4();
  }

  send(message) {
    this.connection.sendUTF(JSON.stringify(message));
  }
}

module.exports = WebsocketClient;