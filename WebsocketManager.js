'use strict';

const http = require('http');
const WebsocketClient = require('./WebsocketClient');
const WebsocketServer = require('websocket').server;
const EventEmitter = require('events');

class WebsocketManager extends EventEmitter {

  constructor() {
    super();
    this.clients = [];
  }

  start(httpServer) {
    this.websocketServer = new WebsocketServer({ httpServer: httpServer, autoAcceptConnections: false, path: '/socket' });
    this.websocketServer.on('request', (request) => {
      this.onWebsocketConnection(request);
    });
  }

  onWebsocketConnection(request) {
    console.log(`${new Date()} Websocket connection accepted.`);
    let connection = request.accept(null, request.origin);
    let client = new WebsocketClient(connection);
    this.clients.push(client);
    connection.on('message', (message) => {
      if (message.type === 'utf8') {
        console.log(`${new Date()} Websocket server received message: ${message.utf8Data}`);
        let data = JSON.parse(message.utf8Data);
        this.onMessageReceivedFromClient(client, data);
      }
    });
    connection.on('close', () => {
      let index = this.clients.indexOf(client);
      if (index >= 0) {
        this.clients.splice(index, 1);
        console.log(`${new Date()} Websocket client ${connection.remoteAddress} disconnected.`);
      }
    });
  }

  onMessageReceivedFromClient(client, message) {
    this.emit('message', client, message);
  }

  sendMessageToClient(client, message) {
    client.send(message);
  }

  sendMessageToClients(message) {
    for (let client of this.clients) {
      client.send(message);
    }
  }
}

module.exports = WebsocketManager;