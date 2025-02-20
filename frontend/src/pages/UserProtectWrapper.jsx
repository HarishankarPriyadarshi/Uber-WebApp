import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({ children }) => {
    const { user, setUser } = useContext(userDataContext)
    const navigate = useNavigate();

    const token = localStorage.getItem('token')
    console.log(token);
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token])


    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper