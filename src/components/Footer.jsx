import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaWhatsapp, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import UniHomeLogo from "./Assets/images/UniHome.png";
import Modal from "./Modal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

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
      <footer className="bg-gray-800 text-white pt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* Logo and Social Section */}
            <div className="w-full lg:w-1/4 text-center lg:text-left">
              <Link to="/" className="flex items-center justify-center mb-6">
                <img
                  src={UniHomeLogo}
                  alt="UniHome Logo"
                  className="w-20 h-20 rounded-xl mr-3"
                />
              </Link>
              <p className="text-sm md:text-base leading-6">
                Get the best private lessons online with professional teachers.
                Choose from a variety of live courses and learn from home with ease.
              </p>
            </div>

            {/* Links Section */}
            <div className="w-full sm:w-1/2 lg:w-1/4 text-center">
              <h6 className="text-[#ff5a1f] text-lg font-bold uppercase mb-4">Links</h6>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    onClick={() =>
                      handleOpenModal(
                        "FAQ",
                        "This section provides answers to the most common questions about UniHome."
                      )
                    }
                    className="hover:underline"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={() =>
                      handleOpenModal(
                        "Contact",
                        "For inquiries, contact us at info@unihome.com."
                      )
                    }
                    className="hover:underline"
                  >
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
            <div className="w-full sm:w-1/2 lg:w-1/4 text-center">
              <h6 className="text-[#ff5a1f] text-lg font-bold uppercase mb-4">Platform</h6>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    onClick={() =>
                      handleOpenModal(
                        "About Us",
                        "Learn more about our journey and the team behind UniHome."
                      )
                    }
                    className="hover:underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={() =>
                      handleOpenModal(
                        "Services",
                        "UniHome offers services designed to support students."
                      )
                    }
                    className="hover:underline"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    onClick={() =>
                      handleOpenModal(
                        "Reviews",
                        "See what our users have to say about UniHome."
                      )
                    }
                    className="hover:underline"
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="w-full lg:w-1/4 text-center">
              <h6 className="text-[#ff5a1f] text-lg font-bold uppercase mb-4">
                {t("contactUs")}
              </h6>
              <address className="not-italic mb-2">
                <i className="bi bi-pin-map"></i> {t("address")}
              </address>
              <a
                href="tel:01222515066"
                className="block hover:underline mb-2"
              >
                <i className="bi bi-telephone"></i> 01222515066
              </a>
              <a
                href="mailto:info@unihome.com"
                className="block hover:underline mb-2"
              >
                <i className="bi bi-envelope"></i> info@unihome.com
              </a>
              <div className="flex justify-center lg:justify-start mt-4 gap-3">
                <a
                  href="https://www.instagram.com/unih0me1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full text-white hover:scale-105 transition-all"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/unih0me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600 rounded-full text-white hover:scale-105 transition-all"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.youtube.com/@UniHome1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-red-600 rounded-full text-white hover:scale-105 transition-all"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://wa.me/201222515066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-green-500 rounded-full text-white hover:scale-105 transition-all"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 text-center py-4 mt-8">
          <p className="text-sm font-bold">
            2024 © UniHome. All Rights Reserved.
          </p>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalContent.title}
          content={modalContent.content}
        />
      </footer>
    </>
  );
};

export default Footer;
