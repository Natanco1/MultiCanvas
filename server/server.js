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



io.on('connection', (socket) => {
    clients.push(socket);
    console.log(`socket with id ${socket.id} has joined`)
    socket.on('id',()=> {
        console.log('socketers idsss')
    })

    socket.on('disconnect', () => {
        var i = clients.indexOf(socket);
        clients.splice(i,1);
        console.log(`socket with id ${socket.id} has disconnected`)
    })
})

app.use(express.static(publicPath))

server.listen(port, () => {
    console.log(`listening to ${port}`);
})