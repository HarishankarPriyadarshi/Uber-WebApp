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
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        })
        // update location frequently
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        socket.on('disconnect', () => {
            console.log(`client disconnected to: ${socket.id}`);

        })
    })

}

export const sendMessageToSocketId = (socketId, messageObject) => {

    //console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}
