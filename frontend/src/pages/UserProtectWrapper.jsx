import React, { useContext, useEffect, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
    const { user, setUser } = useContext(userDataContext)
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        //token validation may be it is expired or invalid
        axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setIsLoading(false)
                setUser(response.data)
            }
        }).catch(err => {
            //remove token from local storage
            console.log(err)
            localStorage.removeItem('token')
            navigate('/login')
        })

    }, [token])


    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper