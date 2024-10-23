// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen text-white p-8">
                <h1 className="text-blue-500 text-9xl font-extrabold animate-bounce">404</h1>
                <img className='w-1/2 md:w-1/3 mb-6 rounded-lg shadow-lg' src="https://media.giphy.com/media/3o6Zt7F3qkI7xj2CBu/giphy.gif" alt="logo" />
                <p className="text-blue-400 mt-4 text-3xl">Oops! Page Not Found</p>
                <Link to="/" className="mt-8 border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black transition duration-300 ease-in-out text-white font-semibold py-3 px-12 mb-2 block rounded-full shadow-md hover:shadow-lg">
                    <span>Go back to Home</span>
                </Link>
            </div>
        </>
    );
};

export default NotFound;
