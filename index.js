import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: 7777 });

const clients = new Map();

wss.on('connection', (ws) => {
  const id = uuidv4();
  clients.set(ws, {id});

  ws.on('message', (messageAsString) => {
    console.log(JSON.parse(messageAsString));
    [...clients.keys()].forEach((client) => {
      client.send(JSON.stringify(JSON.parse(messageAsString)));
    });
  })
});


