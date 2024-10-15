import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-11/12 md:w-2/3 lg:w-1/3 bg-red-600 text-white p-6 rounded-lg shadow-2xl z-50 transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold tracking-wide">{message}</span>
        <button
          className="ml-6 bg-white text-red-600 font-bold text-xl px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-400"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
