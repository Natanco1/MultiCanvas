const Server = require("./entities/server.entity");
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, './public');
const port = 4000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let x;
let y;
let w;
let h;
let choice;
let objects;
let connected = 0;

let TheServer = new Server({})


io.on('connection', (socket) => {
    TheServer.clients.id = socket.id
    console.log("")
    console.log(`-> ${TheServer.clients.id}`)
    connected++;
    TheServer.clients.number = connected;
    socket.on('canvasInfo', (message)=>{
        choice = message.uChoice
        x = message.xTot
        y = message.yTot 
        w = message.wTot
        h = message.hTot
        objects = message.objects
    })
    io.emit('clientConnection', {
        uChoice:choice,
        totX:x, 
        totY:y,
        totW:w,
        totH:h,
        totGroup:objects
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
        TheServer.clients.camera = message.camera
        TheServer.clients.panning = message.panning
        TheServer.clients.position = message.position
        TheServer.clients.rotation = message.rotation
        io.emit('clientUpdate', {
            newPan: TheServer.clients.panning,
            newPosition: TheServer.clients.position,  
            newRotation: TheServer.clients.rotation,
            newCam: TheServer.clients.camera
        })
    })
})


app.use(express.static(publicPath))

server.listen(port, () => {
    console.log(`listening to ${port}`);
    console.log(`access through: http://localhost:4000/canvases.html`)
})