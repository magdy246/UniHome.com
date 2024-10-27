import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

export default function UpIcon() {
    const [isVisible, setIsVisible] = useState(false);

    // Show the icon when scrolling down past a certain point
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            className={`fixed bottom-5 left-[1.3rem] bg-gradient-to-r from-orange-500 to-purple-500 hover:from-purple-500 hover:to-orange-500 text-white py-2 px-3 rounded-full cursor-pointer shadow-lg transition-all -translate-x-10 translate-y-10 z-50 duration-500 ${isVisible ? 'opacity-100 scale-100 translate-x-0 translate-y-0' : 'opacity-0 scale-0 -translate-x-10 translate-y-10'
                }`}
            onClick={scrollToTop}
        >
            <FontAwesomeIcon icon={faAngleUp} />
        </div>
    );
}
