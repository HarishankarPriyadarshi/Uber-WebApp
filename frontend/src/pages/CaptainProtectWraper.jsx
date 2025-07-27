
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { captainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectWraper = ({ children }) => {
    const { captain, setCaptain } = useContext(captainDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();

    const token = localStorage.getItem('captain-token')

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
        //token validation
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        })
            .catch(err => {

                localStorage.removeItem('captain-token')
                navigate('/captain-login')
            })
    }, [token])

    //we have to make sure token is valid or not(may be it is expired or invalid)


    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWraper