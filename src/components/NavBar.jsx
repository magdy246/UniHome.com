import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsChatText } from "react-icons/bs";
import UniHomeLogo from "./Assets/images/UniHome.png";
import unknown from "./Assets/images/profile.jpg";
import EUA from "./Assets/images/Flag_of_the_United_Arab_Emirates.svg.png";
import USA from "./Assets/images/Flag_of_the_United_States.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function NavBar({
  link1 = "Link",
  link2 = "Link",
  link3 = "Link",
  link4 = "Link",
  showLink1 = true,
  showLink2 = true,
  showLink3 = true,
  showLink4 = true,
  showChat = true,
}) {
  const userCookie = localStorage.getItem("user");
  const dataUser = userCookie ? JSON.parse(userCookie) : null;

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
  };

  const isEnglish = currentLanguage === 'en';

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        if (window.scrollY > lastScrollY) {
          setShowNavBar(false);
        } else {
          setShowNavBar(true);
        }
        setLastScrollY(window.scrollY);
      }, 400); // 1 second
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  return (
    <>
      <nav
        className={`bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-50 transition-transform duration-700 ease-in-out ${showNavBar ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="max-w-screen-xl m-auto flex flex-row items-center justify-between mx-auto px-4 py-2">
          <div className="flex justify-center items-center gap-2">
            <NavLink
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={UniHomeLogo} className="w-20 h-20" alt="Logo" />
            </NavLink>
            <span>
              <button
                onClick={() => handleLanguageChange(isEnglish ? 'ar' : 'en')}
                className="group relative p-2 rounded-md overflow-hidden focus:outline-none focus:shadow-outline hover:shadow-lg transition-shadow duration-300 ease-in-out"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-in-out"></div>
                <img
                  src={isEnglish ? USA : EUA}
                  alt={isEnglish ? 'English' : 'Arabic'}
                  className="h-6 w-8 transform transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:translate-t-6"
                />
              </button>

            </span>
          </div>

          {/* {showLink2 && (
            <NavLink to="/" className="hideUniHome  ">
              <h1 className="text-7xl font-[AntonSC-R]">
                <span className="text-blue-600">Uni</span>
                <span className="text-orange-500">Home</span>
              </h1>
              <p className="text-blue-600 text-md font-bold text-center">
                Online University From Home
              </p>
            </NavLink>
          )} */}
          {showLink1 && (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-6 gap-0">
              {/* Chat Icon */}
              {showChat && (
                <div className="gap-x-3 sm:flex justify-center items-center hidden">
                  <div className="indicator h-[42px] relative cursor-pointer mr-3">
                    <span className="indicator-item text-xs bg-red-500 badge text-white">
                      ?
                    </span>
                    <NavLink to="Chat">
                      <BsChatText className="inline text-blue-600 text-3xl mt-2" />
                    </NavLink>
                  </div>
                </div>
              )}

              {/* Notification Icon */}
              {/* {showLink3 && (
                <div className="indicator relative cursor-pointer group mr-3">
                  <div className="hidden p-3 absolute z-[70] -left-40 top-11 group-hover:block rounded-lg min-h-80 min-w-60 border-2 bg-neutral-100 sm:min-w-80 md:min-w-96 lg:min-w-72 md:right-0 md:top-9">
                    <div className="bg-white p-2 rounded-md w-full">
                      <h2 className="text-base md:text-lg lg:text-xl">Title</h2>
                      <p className="text-xs md:text-sm lg:text-base text-slate-400">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </p>
                    </div>
                  </div>
                  <span className="indicator-item text-xs bg-blue-600 badge text-white">
                    2
                  </span>
                  <MdNotificationsActive className="text-4xl text-yellow-300 mt-2" />
                </div>
              )} */}
              <div className="text-xl font-bold text-gray-500 flex justify-center gap-2 items-center capitalize">
                <span className="text-orange-500 text-2xl">{t("Hi")} </span>
                {dataUser?.firstname?.split(' ')[0]}
              </div>
              {/* User Profile */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="w-16 h-16 btn btn-ghost btn-circle avatar">
                  <div className="rounded-full" id="animation-register">
                    <img
                      className="w-full h-full rounded-full"
                      src={dataUser?.image}
                      alt="user"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <div className="px-4 py-3 bg-gray-200 rounded-lg mb-2 w-full" dir="ltr">
                    <span className="block text-sm font-bold text-gray-500 capitalize dark:text-white">
                      {dataUser?.firstname} {dataUser?.lastname}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {dataUser?.email}
                    </span>
                  </div>
                  <li>
                    <NavLink
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                      to="Chat"
                    >
                      {t('Chat')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                      to="/Dashboard"
                    >
                      {t('Dashboard')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/TeacherCards"
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('Teachers')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/setting"
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('Settings')}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wallet"
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('Wallet')}
                    </NavLink>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        logOut();
                        // window.location.reload();
                      }}
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t('SignOut')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {showLink4 && (<>
            <div className="md:flex justify-end items-center gap-3 hidden">
              <span>
                <NavLink
                  className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500  w-full text-white font-bold px-3 py-2 rounded-3xl focus:outline-none focus:shadow-outline"
                  to="/"
                >
                  {t("Home")}
                </NavLink>
              </span>
              <span>
                <NavLink
                  to="/TeacherCards"
                  className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500  w-full text-white font-bold px-3 py-2 rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  {t("Teachers")}
                </NavLink>
              </span>
              <span>
                <NavLink
                  to="/about"
                  className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500  w-full text-white font-bold px-3 py-2 rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  {t("About")}
                </NavLink>
              </span>
            </div>

            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse md:gap-6 gap-0">
              <div className="md:flex justify-end items-center gap-3 hidden">
                <span>
                  <NavLink
                    to="/login"
                    className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500  w-full text-white font-bold p-3 rounded-xl focus:outline-none focus:shadow-outline"
                  >
                    {t("signIn.login")}
                  </NavLink>
                </span>
                <span>
                  <NavLink
                    to="/register"
                    className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500  w-full text-white font-bold p-3 rounded-xl focus:outline-none focus:shadow-outline"
                  >
                    {t("Register")}
                  </NavLink>
                </span>
              </div>
              {/* User Profile */}
              <div className="dropdown dropdown-end hide-dropDown">
                <div tabIndex={0} role="button" className="w-16 h-16 btn btn-ghost btn-circle avatar">
                  <div className="rounded-full" id="animation-register">
                    <img
                      className="w-full h-full rounded-full"
                      src={dataUser?.image || unknown}
                      alt="user"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li>
                    <NavLink
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full my-1 block rounded-xl focus:outline-none focus:shadow-outline"
                      to="/"
                    >
                      {t("Home")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("About")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/TeacherCards"
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("Teachers")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("signIn.login")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="border-2 border-orange-500 bg-orange-500 text-center hover:bg-white hover:text-black duration-500 text-white font-bold py-1 px-10 w-full mb-1 block rounded-xl focus:outline-none focus:shadow-outline"
                    >
                      {t("Register")}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </>)}
        </div>
      </nav>
    </>
  );
}
