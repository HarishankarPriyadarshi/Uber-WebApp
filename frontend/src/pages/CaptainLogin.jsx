import React, { useContext } from 'react'
import uberdriverLogo from '../assets/uberdriverLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { captainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(captainDataContext)

    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email: email,
            password: password
        }
        // console.log(captainData);

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain)
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }
        setEmail('');
        setPassword('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between '>
            <div>
                <img className="w-20 mb-3" src={uberdriverLogo} alt="Uber Logo" />

                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-lg font-medium e mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />
                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-2 py-2 w-full border text-lg placeholder:text-base'
                        type='password'
                        placeholder='password'
                    />
                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded p4-2 py-2 w-full  text-lg placholder:text-base'
                    >Login</button>

                </form>
                <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600 ' >Register as a captain</Link></p>
            </div>
            <div>

                <Link
                    to='/login'
                    className='flex items-center justify-center bg-[#f3c164] text-white font-semibold mb-7 rounded p4-2 py-2 w-full  text-lg placholder:text-base'

                >Sigin as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin