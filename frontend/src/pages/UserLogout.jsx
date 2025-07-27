import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                if (response.status === 200) {
                    localStorage.removeItem('token')
                    
                    // Show success message
                    Swal.fire({
                        title: 'Logged Out!',
                        text: 'You have been successfully logged out',
                        icon: 'success',
                        confirmButtonColor: '#10b461',
                        timer: 1500
                    })
                    
                    navigate('/login')
                }
            } catch (error) {
                console.error('Logout error:', error)
                // Show error message
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || 'Failed to logout. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#d33'
                })
                navigate('/login')
            }
        }
        
        performLogout()
    }, [])

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout