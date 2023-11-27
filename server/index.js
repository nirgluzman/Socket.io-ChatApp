import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 5000;

// create a new WebSocket server instance and binds it to the specified port.
const wss = new WebSocketServer({ port: PORT });

// define an event handler for the connection event emitted by the WebSocket server.
wss.on('connection', (socket) => {
  console.log('Client connected!');

  // define an event handler for the message event emitted by the WebSocket client.
  socket.on('message', (data) => {
    const message = Buffer.from(data).toString();
    console.log(`Received message: ${message}`);
    // if we pass a string, the socket.send() method will automatically convert it to a Buffer.
    socket.send(`Echo: ${data}`);
  });

  // define an event handler for the close event emitted by the WebSocket client.
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
