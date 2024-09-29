import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';
import UniHomeLogo from "./Assets/images/UniHome.png"
import Modal from './Modal';
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const handleOpenModal = (title, content) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const { t } = useTranslation();
  return (
    <>
      <footer className="bg-gray-800 pt-5 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center md:place-items-start">

            {/* Logo and Social Section */}
            <div className="w-full sm:w-auto text-center sm:text-left">
              <Link to="/" className="flex items-center justify-center sm:justify-start mb-6 sm:mb-0">
                <img src={UniHomeLogo} className="w-20 me-3 rounded-xl" alt="Logo" />
                <span className="text-4xl md:text-5xl font-semibold dark:text-white font-[AntonSC-R]">
                  <span className="text-blue-600">Uni</span>
                  <span className="text-orange-500">Home</span>
                </span>
              </Link>
              <p className="py-5 text-sm md:text-base w-64 mx-auto sm:mx-0">
                Get the best private lessons online with professional teachers. Choose from a variety of live courses and learn from home with ease.
              </p>
            </div>

            {/* Links Section */}
            <div className="w-full sm:w-auto text-center sm:text-left">
              <h6 className="text-[#ff5a1f] py-3 text-base md:text-lg font-bold uppercase">Links</h6>
              <ul className="text-white dark:text-gray-400 font-medium mt-4 space-y-2">
                <li>
                  <Link to="#" onClick={() => handleOpenModal('FAQ', 'This is the FAQ section of unihome.com')} className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleOpenModal('Get in Touch', 'Here is how you can contact UniHome')} className="hover:underline">
                    Get in Touch
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleOpenModal('Contact', 'Contact UniHome at info@unihome.com')} className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Section */}
            <div className="w-full sm:w-auto text-center sm:text-left">
              <h6 className="text-[#ff5a1f] py-3 text-base md:text-lg font-bold uppercase">Platform</h6>
              <ul className="text-white dark:text-gray-400 font-medium mt-4 space-y-2">
                <li>
                  <Link to="#" onClick={() => handleOpenModal('About Us', 'Learn more about UniHome')} className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleOpenModal('Services', 'Details about UniHome services')} className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleOpenModal('Reviews', 'See what users say about UniHome')} className="hover:underline">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="w-full sm:w-auto text-center sm:text-left">
              <h6 className="text-[#ff5a1f] py-3 text-base md:text-lg font-bold uppercase">{t('contactUs')}</h6>
              <address className="mt-4 text-sm md:text-base m-0 mb-1"><i className="bi bi-pin-map"></i> {t('address')}</address>
              <a href="tel:01222515066" className="text-white mb-1 text-sm md:text-base hover:underline block">
                <i className="bi bi-telephone"></i> 01222515066
              </a>
              <a href="mailto:info@unih0me.com" className="text-white mb-1 text-sm md:text-base hover:underline block">
                <i className="bi bi-envelope"></i> info@unih0me.com
              </a>
              <Link to="/" className="text-white text-sm md:text-base hover:underline">
                <i className="bi bi-skype"></i> UniHome
              </Link>

              {/* Social Icons */}
              <ul className="flex justify-center sm:justify-start gap-2 mt-4">
                <li><button className="text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full p-2"><FaInstagram /></button></li>
                <li><button className="bg-blue-600 text-white rounded-full p-2"><FaFacebook /></button></li>
                <li><button className="text-white bg-blue-600 rounded-full p-2"><FaLinkedin /></button></li>
                <li><button className="text-white bg-red-600 rounded-full p-2"><FaYoutube /></button></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center bg-gray-900 text-white mt-4 p-2">
          <p className="mb-0 text-sm md:text-base font-bold">2024 © unih0me All Rights Reserved</p>
        </div>
      </footer>

        {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
        content={modalContent.content}
      />
    </>
  );
};

export default Footer;