import rideModel from '../models/ride.model.js'
import { validationResult } from 'express-validator'
import { createRideService, getFareService, confirmRideService, startRideService, endRideService } from '../services/ride.service.js'
import { getAddressCoordinate, getCaptainsInTheRadius } from '../services/map.service.js';
import { sendMessageToSocketId } from '../socket.js'

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // find captain for users after return coz i want to get notification user first

        const pickupCoordinates = await getAddressCoordinate(pickup);
        //console.log('pickupCoordinates', pickupCoordinates);

        const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);  // radius in km
        console.log('captainsInRadius', captainsInRadius);
        console.log('ride', ride);

        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map(captain => {

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })

    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }

}

export const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;
    try {
        const fare = await getFareService(pickup, destination);
        return res.status(200).json(fare);


    } catch (error) {
        return req.status(500).json({ message: err.message })
    }
}

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await confirmRideService({ rideId, captain: req.captain });
        console.log('ride confirmed from backend', ride);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {

        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRideService({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await endRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}