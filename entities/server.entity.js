class Server {
    constructor(clients = {id, position, rotation, number, panning}){
        this.clients = clients
    }
}

module.exports = Server;
