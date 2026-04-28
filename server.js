const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

let alertState = false;

io.on('connection', (socket) => {
    console.log('Клієнт підключився');

    // Надсилаємо поточний стан тривоги
    socket.emit('alert', alertState);

    // Клієнт змінив стан тривоги
    socket.on('setAlert', (state) => {
        alertState = state;
        io.emit('alert', alertState);
    });

    // Розблокувати аудіо на всіх клієнтах
    socket.on('unlockAudioAll', () => {
        io.emit('unlockAudio');
    });
});

server.listen(3000, () => {
    console.log('Сервер працює на http://localhost:3000');
});