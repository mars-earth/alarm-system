const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path'); // 👈 новий рядок

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// маршрут для головної сторінки
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

let alertState = false;

io.on('connection', (socket) => {
    console.log('Клієнт підключився');

    socket.emit('alert', alertState);

    socket.on('setAlert', (state) => {
        alertState = state;
        io.emit('alert', alertState);
    });
});

server.listen(3000, () => {
    console.log('Сервер працює на http://localhost:3000');
});