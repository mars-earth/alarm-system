const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.static(__dirname));

let alertState = false;

io.on('connection', (socket) => {

    console.log("Client connected");

    socket.emit('alert', alertState);

    socket.on('setAlert', (state) => {
        console.log("SET ALERT:", state);

        alertState = Boolean(state);

        io.emit('alert', alertState);
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
