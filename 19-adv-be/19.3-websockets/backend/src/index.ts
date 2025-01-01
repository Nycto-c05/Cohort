import { log } from 'console'
import express from 'express'
import { WebSocketServer, WebSocket} from 'ws'

const app = express()

app.get('/', (req,res) => {
  res.send("Hello there")
})

const httpServer = app.listen(8080, ()=>log("Listening on port 8080"))

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  // if receive message from one client, broadcast that msg to all clients
  ws.on('message', function message(data, isBinary) {
    log(data.toString())
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message From Server!!');
});