import React, { useState, useEffect } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import LessonCard from "./LessonCard";
import Completed from "./Completed";
import Cancelled from "./Cancelled";
import Incomplete from "./Incomplete";
import Booked from "./Booked";
import LottieHandler from "../Lottie/LottieHandler";
import LoaderAnimation from "../Assets/loaderAnimate.json";
import Animation from "../Assets/images/Animation.gif";
import { t } from "i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
export default function RoutingSession({ Session, Student }) {
  const [colorsActive, setColorsActive] = useState({
    tab1: "tab1",
    tab2: "tab1",
    tab3: "tab1",
    tab4: "tab1",
    tab5: "tab1",
    tab6: "tab1",
    tab7: "tab1",
    tab8: "tab1",
  });
  const [loading, setLoading] = useState(true);
  const savedLang = localStorage.getItem("lang") || 'en';
  const [Lang, setLang] = useState(savedLang);

  useEffect(() => {
    try {
      const parsedLang = JSON.parse(savedLang);
      setLang(parsedLang);
    } catch (error) {
      console.error('Failed to parse language from localStorage', error);
    }
  }, [savedLang]);

  useEffect(() => {
    const fetchSessions = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchSessions();
  }, [])

  const handleColorsClick = (value) => {
    if (value === colorsActive) {
      return;
    }
    setColorsActive({ ...colorsActive, ...value });
  };

  const tabButtonStyles = "tabsOfRoute";


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LottieHandler animationData={LoaderAnimation} />
      </div>
    );
  }


  return (
    <>
      <Helmet>
        <title>Dashboard - UniHome</title>
        <meta name="description" content="Welcome to your UniHome Dashboard. Manage your courses, track your progress, and access personalized learning resources." />
        <meta name="keywords" content="UniHome, dashboard, course management, progress tracking, online learning, personalized resources, English courses" />
        <meta name="author" content="UniHome" />
        <meta property="og:title" content="Dashboard - UniHome" />
        <meta property="og:description" content="Manage your learning journey with the UniHome Dashboard. Access courses, track your progress, and connect with your tutors." />
        <meta property="og:image" content="./src/components/Assets/images/UniHome.png" />
        <meta property="og:url" content="https://unih0me.com/dashboard" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard - UniHome" />
        <meta name="twitter:description" content="Your UniHome Dashboard is here! Manage your courses and track your progress easily." />
        <meta name="twitter:image" content="./src/components/Assets/images/UniHome.png" />
        <link rel="canonical" href="https://unih0me.com/dashboard" />
      </Helmet>
      <div className="mb-3">
        <h1 className="text-center text-6xl font-bold text-white my-6 relative">
          <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t("Sessions")}</span>
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
        </h1>
        {/* Centered Tabs */}
        <div className="flex justify-center" dir={Lang === "ar" ? "rtl" : "ltr"}>
          <TETabs className="flex justify-center items-center">
            <TETabsItem
              onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab1" })}
              active={colorsActive.tab8 === "tab1"}
              className={`${tabButtonStyles} ${colorsActive.tab8 === "tab1" ? "ActivetabsOfRoute" : ""
                }`}
            >
              {t("All Lessons")}
            </TETabsItem>
            <TETabsItem
              onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab5" })}
              active={colorsActive.tab8 === "tab5"}
              className={`${tabButtonStyles} ${colorsActive.tab8 === "tab5" ? "ActivetabsOfRoute" : ""
                }`}
            >
              {t("Booked")}
            </TETabsItem>
            <TETabsItem
              onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab2" })}
              active={colorsActive.tab8 === "tab2"}
              className={`${tabButtonStyles} ${colorsActive.tab8 === "tab2" ? "ActivetabsOfRoute" : ""
                }`}
            >
              {t("Completed")}
            </TETabsItem>

            <TETabsItem
              onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab4" })}
              active={colorsActive.tab8 === "tab4"}
              className={`${tabButtonStyles} ${colorsActive.tab8 === "tab4" ? "ActivetabsOfRoute" : ""
                }`}
            >
              {t("Incompleted")}
            </TETabsItem>
            <TETabsItem
              onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab3" })}
              active={colorsActive.tab8 === "tab3"}
              className={`${tabButtonStyles} ${colorsActive.tab8 === "tab3" ? "ActivetabsOfRoute" : ""
                }`}
            >
              {t("Cancelled")}
            </TETabsItem>
          </TETabs>
        </div>

        {/* Tab Content */}
        {Session && Session.length > 0 ? (
          <div className="mt-5">
            <TETabsContent>
              <TETabsPane show={colorsActive.tab8 === "tab1"}>
                {Session.map((e, index) => (
                  <LessonCard StudentData={Student} key={index} Session={e} />
                ))}
              </TETabsPane>
              <TETabsPane show={colorsActive.tab8 === "tab2"}>
                {Session.map((e, index) => (
                  <Completed StudentData={Student} key={index} Session={e} />
                ))}
              </TETabsPane>
              <TETabsPane show={colorsActive.tab8 === "tab3"}>
                {Session.map((e, index) => (
                  <Cancelled StudentData={Student} key={index} Session={e} />
                ))}
              </TETabsPane>
              <TETabsPane show={colorsActive.tab8 === "tab4"}>
                {Session.map((e, index) => (
                  <Incomplete StudentData={Student} key={index} Session={e} />
                ))}
              </TETabsPane>
              <TETabsPane show={colorsActive.tab8 === "tab5"}>
                {Session.map((e, index) => (
                  <Booked StudentData={Student} key={index} Session={e} />
                ))}
              </TETabsPane>
            </TETabsContent>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 md:p-8 lg:p-10">
            <img
              src={Animation}
              alt="No Sessions"
              className="w-64 h-auto mb-4 md:w-72 lg:w-80"
            />
            <h2 className="text-2xl font-bold text-gray-800 text-center md:text-3xl lg:text-4xl mb-2">
              No Sessions Available
            </h2>
            <p className="text-gray-600 text-center text-base md:text-lg lg:text-xl">
              It seems you don't have any sessions at the moment. Please go to book sessions with your favorite teacher!
            </p>
          </div>


        )}
      </div >
    </>
  );
}
