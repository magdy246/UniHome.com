import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
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
          <div className="flex flex-wrap justify-around gap-8">

            {/* Logo and Social Section */}
            <div className="md:w-1/4 w-full sm:w-auto text-center sm:text-left">
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
            <div className="md:w-1/4 w-full sm:w-auto text-center sm:text-left">
              <h6 className="text-[#ff5a1f] py-3 text-base md:text-lg font-bold uppercase">Links</h6>
              <ul className="text-white dark:text-gray-400 font-medium mt-4 space-y-2">
                <li>
                  <Link to="#" onClick={() => handleOpenModal('FAQ', ' This section provides answers to the most common questions about UniHome. Whether you have queries about our services, the platform, or any other topic, you can find clear and concise answers here. If you don’t find your question answered, feel free to reach out to us!')} className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleOpenModal('Contact', 'For more specific inquiries, please contact us directly at info@unihome.com. Our dedicated support team is ready to assist you with any questions or concerns you may have regarding our services or your account.')} className="hover:underline">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/Privacy-Policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/Developers" className="hover:underline">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Section */}
            <div className="md:w-1/4 w-full sm:w-auto text-center sm:text-left">
              <h6 className="text-[#ff5a1f] py-3 text-base md:text-lg font-bold uppercase">Platform</h6>
              <ul className="text-white dark:text-gray-400 font-medium mt-4 space-y-2">
                <li>
                  <Link to="#" onClick={() => handleOpenModal('About Us', 'At UniHome, we strive to create an innovative platform that connects students and educational resources. Our mission is to enhance the learning experience by providing comprehensive support and access to essential services. Learn more about our journey and the team behind UniHome.')} className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleOpenModal('Services', 'UniHome offers a range of services designed to support students in their academic pursuits. From tutoring and study materials to mental health resources and community support, we are dedicated to helping you succeed in your educational journey.')} className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={() => handleOpenModal('Reviews', `Don't just take our word for it! See what our users have to say about their experiences with UniHome. Read real testimonials and reviews that highlight the benefits of our platform and how we've made a positive impact on our community.`)} className="hover:underline">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="md:w-1/4 w-full sm:w-auto text-center sm:text-left">
              <h6 className="text-[#ff5a1f] py-3 text-base md:text-lg font-bold uppercase">{t('contactUs')}</h6>
              <address className="mt-4 text-sm md:text-base m-0 mb-1"><i className="bi bi-pin-map"></i> {t('address')}</address>
              <a href="tel:01222515066" className="text-white mb-1 text-sm md:text-base hover:underline block">
                <i className="bi bi-telephone"></i> 01222515066
              </a>
              <a href="mailto:info@unih0me.com" className="text-white mb-1 text-sm md:text-base hover:underline block">
                <i className="bi bi-envelope"></i> info@unih0me.com
              </a>
              <Link to="/" className="text-white text-sm md:text-base font-bold hover:bg-gray-800 duration-500 transition-all bg-black px-2 py-1 rounded-3xl">
                <i className="bi bi-skype"></i> <span className='text-blue-600'>Uni</span><span className='text-orange-500'>Home</span>
              </Link>

              {/* Social Icons */}
              <ul className="flex justify-center sm:justify-start gap-2 mt-4">
                <a href="https://www.instagram.com/unih0me1?igsh=ZmI4YXplYjYwaWNt&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full p-2 hover:scale-105 transition-all duration-300">
                  <FaInstagram />
                </a>
                <a href="https://www.facebook.com/unih0me/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white rounded-full p-2 hover:scale-105 transition-all duration-300">
                  <FaFacebook />
                </a>
                <a href="https://www.youtube.com/@UniHome1" target="_blank" rel="noopener noreferrer" className="text-white bg-red-600 rounded-full p-2 hover:scale-105 transition-all duration-300">
                  <FaYoutube />
                </a>
                <a href="https://wa.me/201222515066" target="_blank" rel="noopener noreferrer" className="text-white bg-green-500 rounded-full p-2 hover:scale-105 transition-all duration-300">
                  <FaWhatsapp />
                </a>
                {/* <a href="#d" className="text-white bg-blue-600 rounded-full p-2"><FaLinkedin /></a> */}
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