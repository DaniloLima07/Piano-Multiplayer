// Conexão com o servidor WebSocket
const socket = io();

// Enviar evento de toque de tecla para o servidor
const sendKeyDownEvent = (note) => {
    socket.emit('keydown', note);
}

const sendKeyUpEvent = (note) => {
    socket.emit('keyup', note);
}

// Receber eventos de toque de tecla de outros clientes
socket.on('keydown', (note) => {
    playNote(note);
});

socket.on('keyup', (note) => {
    // Lidar com o evento de soltar a tecla, se necessário
});

// Event listeners para as teclas do piano
keys.forEach((key) => {
    const note = key.getAttribute('data-note');

    key.addEventListener('mousedown', () => {
        sendKeyDownEvent(note);
        handleMouseDown(key);
    });

    key.addEventListener('mouseup', () => {
        sendKeyUpEvent(note);
        handleMouseUp(key);
    });
});

// Event listeners para as teclas do teclado
document.addEventListener('keydown', (event) => {
    const note = keyNoteMap[event.key];

    if (note) {
        sendKeyDownEvent(note);
        handleMouseDown(keys[note - 1]);
    }
});

document.addEventListener('keyup', (event) => {
    const note = keyNoteMap[event.key];

    if (note) {
        sendKeyUpEvent(note);
        handleMouseUp(keys[note - 1]);
    }
});
