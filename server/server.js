const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../src');
const port = 4000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket)=> {
    window.location.href = `http://localhost:4000/${socket.id}`
    console.log(`${socket.id}`);
})

app.use(express.static(publicPath))

server.listen(port, () => {
    console.log(`listening to ${port}`);
})