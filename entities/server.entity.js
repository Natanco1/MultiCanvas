class Server {
    constructor(clients = {id, camera, position, rotation, number, panning}){
        this.clients = clients
    }
}

module.exports = Server;
