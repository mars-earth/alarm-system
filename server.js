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
const ADMIN_KEY = "12345";

io.on('connection', (socket) => {
    console.log("Client connected");

    socket.emit('alert', alertState);

    socket.on('setAlert', (data) => {
        console.log("SET ALERT:", data);

        if (!data || data.key !== ADMIN_KEY) {
            console.log("❌ Invalid admin key");
            return;
        }

        alertState = Boolean(data.state);

        console.log("STATE:", alertState);

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
