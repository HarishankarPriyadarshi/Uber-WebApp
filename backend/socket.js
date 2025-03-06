import { Server } from 'socket.io'
import userModel from './models/user.model.js'
import captainModel from './models/captain.model.js'

let io;

export const intializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(`client connected to : ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);


            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id })
            } else {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        })

        socket.on('disconnect', () => {
            console.log(`client disconnected to: ${socket.id}`);

        })
    })

}

export const sendMessagetoSocketId = (socketId, message) => {
    if (io) {
        io.to(socketId).emit('message', message)
    } else {
        console.log(`socket.io not intialized`);

    }
}