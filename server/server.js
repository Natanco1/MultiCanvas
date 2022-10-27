const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '/../src');
const port = 4000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

class Server {
    constructor(clients = {id, position, rotation}){
        this.clients = clients
    }
}

let TheServer = new Server({})


io.on('connection', (socket) => {
    TheServer.clients.id = socket.id
    console.log(`C -> ${TheServer.clients.id}`)


    socket.on('disconnect', () => {
        console.log(`D <- ${TheServer.clients.id}`)
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
    console.log(`access through: http://localhost:4000 or run command "npm run browse"`)
})