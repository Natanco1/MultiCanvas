const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '/../src');
const port = 4000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
const {exec} = require('child_process');

var clients = [];
var position = [];
var rotation = [];



io.on('connection', (socket) => {
    clients.push(socket);
    var index = clients.indexOf(socket);
    console.log(`C -> ${socket.id}: ${index}`)


    socket.on('disconnect', () => {
        clients.splice(index,1);
        console.log(`D <- ${socket.id}: ${index}`)
        
    })

    socket.on('update', (message) =>{
        position.push(message.pos1)
        rotation.push(message.rot1)
        console.log('position')
        console.log(position[index])
        console.log('rotation:')
        console.log(rotation[index])
    })
})

app.use(express.static(publicPath))

server.listen(port, () => {
    console.log(`listening to ${port}`);
})