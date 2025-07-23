import React, { useState, useRef, useContext, useEffect } from 'react'
import uberdriverLogo from '../assets/uberdriverLogo.png'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePop from '../components/ConfirmRidePop'
import { SocketContext } from '../context/SocketContext'
import { captainDataContext } from '../context/CaptainContext'
import axios from 'axios';

const CaptainHome = () => {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
    const ridePopUpPanelRef = useRef(null)
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
    const confirmRidePopUpPanelRef = useRef(null)
    const [ride, setRide] = useState(null)

    //socket handling
    const { socket } = useContext(SocketContext)
    const { captain } = useContext(captainDataContext)



    // useEffect(() => {
    //     // console.log(captain);

    //     socket.emit('join', {
    //         userId: captain?._id,
    //         userType: 'captain'
    //     })

    //     // find device location and update using port
    //     const updateLocation = () => {
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(position => {
    //                 // console.log(
    //                 //     position.coords.latitude,
    //                 //     position.coords.longitude
    //                 // );

    //                 // console.log('userId', captain?._id)
    //                 socket.emit('update-location-captain', {
    //                     userId: captain?._id,
    //                     location: {
    //                         ltd: position.coords.latitude,
    //                         lng: position.coords.longitude
    //                     }
    //                 })
    //             })
    //         }
    //     }
    //     const locationInterval = setInterval(updateLocation, 10000)
    //     updateLocation()

    // }, [captain])
    useEffect(() => {
        socket.emit('join', {
            userId: captain?._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    //console.log('usevbrId', captain?._id)
                    socket.emit('update-location-captain', {
                        userId: captain?._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [captain])

    socket.on('new-ride', (data) => {
        //console.log('new ride data', data);
        setRide(data)
        setRidePopUpPanel(true)
    })

    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        //console.log('confirm ride response', response.data);

        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)

    }

    useGSAP(function () {
        if (ridePopUpPanel) {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopUpPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopUpPanel])

    useGSAP(function () {
        if (confirmRidePopUpPanel) {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopUpPanel])

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src={uberdriverLogo} alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-2/5 p-6' >
                <CaptainDetails />
            </div>
            <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    confirmRide={confirmRide}
                    setRidePopUpPanel={setRidePopUpPanel}
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                />
            </div>
            <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePop
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                    setRidePopUpPanel={setRidePopUpPanel}
                    ride={ride}

                />

            </div>
        </div>
    )
}

export default CaptainHome