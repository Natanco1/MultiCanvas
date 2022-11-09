const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, './public');
const port = 4000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


let connected = 0;

class Server {
    constructor(clients = {id, position, rotation, number}){
        this.clients = clients
    }
}

let TheServer = new Server({})


io.on('connection', (socket) => {
    TheServer.clients.id = socket.id
    console.log(`-> ${TheServer.clients.id}`)
    connected++;
    TheServer.clients.number = connected;
    io.emit('clientConnection', {
        connectedC: connected
    })

    socket.on('disconnect', () => {
        TheServer.clients.id = socket.id
        console.log(`<- ${TheServer.clients.id}`)
        connected--;
        io.emit('clientConnection', {
            connectedC: connected
        })
    })

    socket.on('serverUpdate', (message) =>{
        TheServer.clients.position = message.position
        TheServer.clients.rotation = message.rotation
        io.emit('clientUpdate', {
            newPosition: TheServer.clients.position,  
            newRotation: TheServer.clients.rotation,
        })
    })
})

app.use(express.static(publicPath))

server.listen(port, () => {
    console.log(`listening to ${port}`);
    console.log(`access through: http://localhost:4000/canvases.html`)
    console.log('http://172.17.52.77:4000 or run command "npm run browse"')
})