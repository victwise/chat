var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    })
});

// 'on' - escuchar información
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// 'emit' - Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Victor Miranda',
//     mensaje: 'Hi!'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// EScuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat
socket.on('listarPersona', function(personas) {
    console.log(personas);
});

//Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
});