import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChatText } from "react-icons/bs";
import UniHomeLogo from "./Assets/images/UniHome.png";
import unknown from "./Assets/images/profile.jpg";
import EUA from "./Assets/images/Flag_of_the_United_Arab_Emirates.svg.png";
import USA from "./Assets/images/Flag_of_the_United_States.png";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function NavBar({
  showChat = true,
  showLink1 = true,
  showLink2 = true,
  showLink3 = true,
  showLink4 = true,
}) {
  const dataUser = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const [isEnglish, setIsEnglish] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      try {
        const parsedLang = JSON.parse(savedLang);
        setCurrentLanguage(parsedLang);
        i18n.changeLanguage(parsedLang);
      } catch (error) {
        console.error('Failed to parse language from localStorage', error);
      }
    } else {
      setCurrentLanguage(i18n.language);
    }
  }, [i18n]);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", JSON.stringify(lng));
    setCurrentLanguage(lng);
    setIsEnglish(lng === 'en');
  };

  const logOut = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl m-auto flex flex-row items-center justify-between mx-auto px-4 py-2">
          <div className="flex justify-center items-center gap-2">
            <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={UniHomeLogo} className="w-20 h-20" alt="Logo" />
            </NavLink>
            <span>
              <button
                onClick={() => handleLanguageChange(isEnglish ? 'ar' : 'en')}
                className="group relative bg-gray-100 p-2 rounded-md overflow-hidden focus:outline-none focus:shadow-outline hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <img
                  src={currentLanguage === "ar" ? USA : EUA}
                  alt={currentLanguage === "ar" ? 'English' : 'Arabic'}
                  className="h-6 w-8 transform transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6"
                />
              </button>
            </span>
          </div>

          {showLink1 && (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-6 gap-0">
              <div className="text-xl font-bold text-gray-500 flex justify-center gap-2 items-center capitalize">
                <span className="text-orange-500 text-2xl">{t('Hi')}</span>
                {dataUser?.firstname}
              </div>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  id="animation-register"
                  className="w-16 h-16 rounded-full"
                  src={dataUser?.image}
                  alt="user"
                />
              </button>
              <div
                ref={dropdownRef}
                className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="user-dropdown"
              >
                <div className="px-4 py-3 bg-gray-200 rounded-t-lg">
                  <span className="block text-sm font-bold text-gray-900 capitalize dark:text-white">
                    {dataUser?.firstname} {dataUser?.lastname}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {dataUser?.email}
                  </span>
                </div>
                <ul className="p-4 rounded-x-lg rounded-b-lg text-center bg-blue-200 font-bold" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                      to="Chat"
                    >
                      {t('Chat')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                      to="/Dashboard"
                    >
                      {t('Dashboard')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/TeacherS"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('Teachers')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/setting"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('Settings')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wallet"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('Wallet')}
                    </NavLink>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        logOut();
                        window.location.reload();
                      }}
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('SignOut')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {showLink4 && (<>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-6 gap-0">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  id="animation-register"
                  className="w-16 h-16 rounded-full"
                  src={unknown}
                  alt="user"
                />
              </button>
              <div
                ref={dropdownRef}
                className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="user-dropdown"
              >
                <ul className="p-4 rounded-lg rounded-b-lg text-center bg-blue-200 font-bold" aria-labelledby="user-menu-button">
                  <li>
                    <NavLink
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                      to="/"
                    >
                      {t("Home")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("About")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/TeacherS"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("Teachers")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("Register")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("signIn.login")}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </>
          )}
        </div>
      </nav>
    </>
  );
}
