import rideModel from '../models/ride.model.js'
import { validationResult } from 'express-validator'
import { createRideService, getFareService } from '../services/ride.service.js'

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        // const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        // const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        // ride.otp = ""

        // const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        // captainsInRadius.map(captain => {

        //     sendMessageToSocketId(captain.socketId, {
        //         event: 'new-ride',
        //         data: rideWithUser
        //     })

        // })

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
        const fare = getFareService(pickup, destination);
        return res.status(200).json(fare);

    } catch (error) {
        return req.status(500).json({ message: err.message })
    }
}

export const confirmRide = async (req, res) => {

}

export const startRide = async (req, res) => {

}

export const endRide = async (req, res) => {

}