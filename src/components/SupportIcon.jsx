import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FcOnlineSupport } from 'react-icons/fc';
import { MdOutlineSupportAgent } from "react-icons/md";
import { Link } from 'react-router-dom';


const SupportIcon = () => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <a
        href="https://wa.me/201222515066"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-5 right-[1.3rem] bg-green-400 hover:bg-green-500 text-white p-3 rounded-full cursor-pointer shadow-lg transition-all z-50 duration-500 ${focused ? "transform translate-y-[-4rem]" : ""}`}
      >
        <FaWhatsapp size={30} />
      </a>
      <Link
        to="/support"
        className={`fixed bottom-[22.5px] right-[1.3rem] bg-white hover:bg-gray-100 text-black p-[0.9rem] z-50 rounded-full cursor-pointer shadow-lg transition-all duration-500 ${focused ? "transform translate-y-[-8rem]" : ""}`}
      >
        <MdOutlineSupportAgent size={24} />
      </Link>
      <Link
        className="fixed bottom-5 right-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full z-50 cursor-pointer shadow-lg transition-all duration-500 focus:rotate-[360deg]"
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 300)}
      >
        <FcOnlineSupport size={24} />
      </Link>

    </>
  );
};

export default SupportIcon;
