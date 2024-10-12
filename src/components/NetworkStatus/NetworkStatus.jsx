import React, { useState, useEffect } from 'react';
import { IoWifi } from "react-icons/io5";
import { PiWifiSlashBold } from "react-icons/pi";
import "./NetworkStatus.css"

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000); // Hide after 5 seconds
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000); // Hide after 5 seconds
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            {showMessage && (
                <div
                    className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-full sm:w-11/12 md:max-w-md shadow-2xl transition-all duration-500 ease-in-out ${isOnline ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                        } text-white text-center py-2 px-4 sm:py-3 sm:px-5 md:py-4 md:px-6 rounded-full z-50 opacity-95 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 shadow-lg`}
                >
                    {isOnline ? (
                        <>
                            <IoWifi className="text-white text-xl sm:text-2xl" />
                            <span className="text-sm sm:text-base md:text-lg font-medium">You are currently online.</span>
                        </>
                    ) : (
                        <>
                            <PiWifiSlashBold className="text-white text-xl sm:text-2xl" />
                            <span className="text-sm sm:text-base md:text-lg font-medium">You are currently offline. Please check your network connection.</span>
                        </>
                    )}
                </div>
            )}

        </>
    );
};

export default NetworkStatus;
