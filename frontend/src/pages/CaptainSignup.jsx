import React from 'react'
import uberdriverLogo from '../assets/uberdriverLogo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CaptainSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()

        setUserData({
            fullName: {
                firstName,
                lastName
            },
            email,
            password
        })

        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');

    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between '>
            <div>
                <img className="w-16 mb-5" src={uberdriverLogo} alt="Uber Logo" />

                <form onSubmit={(e) => { submitHandler(e) }}>
                    <h3 className='text-lg font-medium e mb-2'>What's our captain's name</h3>
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
                    <h3 className='text-lg font-medium e mb-2'>What's our captain's email</h3>
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
                    >Login</button>

                </form>
                <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600 ' >Login Here</Link></p>
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

export default CaptainSignup