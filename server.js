const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static('public')); // Servir archivos estáticos

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Recibir imagen desde el cliente Desktop
    socket.on('image', (data) => {
        console.log('Imagen recibida, reenviando a mobile...');
        io.emit('image', data); // Reenviar la imagen
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
