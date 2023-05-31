const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuração do servidor estático
app.use(express.static(__dirname));

// Gerenciamento das conexões WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Lidar com o evento de toque de tecla recebido do cliente
    socket.on('keydown', (note) => {
        // Transmitir o evento para todos os outros clientes
        socket.broadcast.emit('keydown', note);
    });

    socket.on('keyup', (note) => {
        // Transmitir o evento para todos os outros clientes
        socket.broadcast.emit('keyup', note);
    });

    // Lidar com a desconexão do cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});
