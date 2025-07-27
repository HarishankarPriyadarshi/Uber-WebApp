import React, { useContext } from 'react'
import uberLogo from '../assets/uberLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx'
import { useState } from 'react';
import Swal from 'sweetalert2'
import axios from "axios"

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})

    const { user, setUser } = useContext(userDataContext)
    const navigate = useNavigate()


    const submitHandler = async (e) => {
        e.preventDefault()

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email,
            password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
            if (response.status === 201) {
                const data = response.data;
                setUser(data.user)
                localStorage.setItem('token', data.token)
                
                // Show success message
                Swal.fire({
                    title: 'Success!',
                    text: 'Your account has been created successfully',
                    icon: 'success',
                    confirmButtonColor: '#10b461',
                    timer: 1500
                })
                
                navigate('/home')
            }

            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');
        } catch (error) {
            // Show error message
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to create account. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33'
            })
        }
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between '>
            <div>
                <img className="w-16 mb-8" src={uberLogo} alt="Uber Logo" />

                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-lg font-medium e mb-2'>What's your name</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                            className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type="text"
                            placeholder='First Name'
                        />
                        <input
                            required
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value) }}
                            className='bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            type="text"
                            placeholder='Last Name'
                        />
                    </div>
                    <h3 className='text-lg font-medium e mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className='bg-[#eeeeee] mb-5 rounded-lg px-2 py-2 w-full border text-lg placeholder:text-base'
                        type='password'
                        placeholder='password'
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded p4-2 py-2 w-full  text-lg placeholder:text-base'
                    >Create Account</button>

                </form>
                <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600 ' >Login Here</Link></p>
            </div>
            <div>

                <div>
                    <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
                </div>
            </div>
        </div>
    )
}

export default UserSignup