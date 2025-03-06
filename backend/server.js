import app from './app.js'
import colors from 'colors';

import { intializeSocket } from './socket.js';
import http from 'http'

const PORT = process.env.PORT || 5002

const server = http.createServer(app)
intializeSocket(server)

server.listen(PORT, () => {
    console.log(`server is listen on port number ${PORT}`.bgCyan.white);
}) 