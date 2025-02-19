import React from 'react'
import uberLogo from '../assets/uberLogo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        })
        console.log(userData);

        setEmail('');
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between '>
            <div>
                <img className="w-16 mb-8" src={uberLogo} alt="Uber Logo" />

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
                <p className='text-center'>New here? <Link to='/signup' className='text-blue-600 ' >Create new account</Link></p>
            </div>
            <div>

                <Link
                    to='/captain-login'
                    className='flex items-center justify-center mb-5 bg-[#10b461] text-white font-semibold mb-7 rounded p4-2 py-2 w-full  text-lg placholder:text-base'

                >Sigin as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin