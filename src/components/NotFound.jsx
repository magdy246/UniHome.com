// src/components/NotFound.js
import React from 'react';
import logo from "./Assets/images/UniHome.png"
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen text-white p-8">
                <img className='w-32 mb-6 shadow-xl shadow-black rounded-full' src={logo} alt="logo" />
                <h1 className="text-blue-500 text-9xl font-extrabold animate-bounce">404</h1>
                <p className="text-blue-400 mt-4 text-3xl">Oops! Page Not Found</p>
                <Link to="/" className="mt-8 border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black transition duration-300 ease-in-out text-white font-semibold py-3 px-12 mb-2 block rounded-full shadow-md hover:shadow-lg">
                    <span>Go back to Home</span>
                </Link>
            </div>
        </>
    );
};

export default NotFound;
