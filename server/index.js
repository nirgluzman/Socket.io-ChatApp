import { createServer } from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

// Server Initialization
// https://socket.io/docs/v4/server-initialization/#with-an-http-server

// create a new HTTP server instance and binds it to the specified port.
const httpServer = createServer();

// create a new Socket.IO server instance and binds it to the HTTP server.
const io = new Server(httpServer, {
  /* options */
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? false
        : [`http://localhost:5500`, `http://127.0.0.1:5500`],
  },
});

// event handler that is triggered whenever a new client establishes a WebSocket connection with the Socket.io server.
io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected!`);

  // message event
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);
    io.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });
});

// start the HTTP server and listen for incoming connections.
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
