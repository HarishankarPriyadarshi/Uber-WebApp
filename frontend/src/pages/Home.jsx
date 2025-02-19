import React from 'react';
import uberLogo from '../assets/uberLogo.png';
import uberHomeBg from '../assets/uberHomeBg.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div
                className="h-screen pt-8 flex justify-between flex-col w-full bg-red-400"
                style={{ backgroundImage: `url(${uberHomeBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <img className="w-16 ml-8" src={uberLogo} alt="Uber Logo" />
                <div className="bg-white pb-7 py-5 px-4">
                    <h2 className="text-3xl font-bold">Get started with Uber</h2>
                    {/* <button className="w-full bg-black text-white py-3 rounded mt-2">Continue</button> */}
                    <Link to='/login' className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-2">Continue</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
