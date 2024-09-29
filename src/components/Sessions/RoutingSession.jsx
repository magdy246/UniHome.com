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
import { t } from "i18next";
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
    <div className="mb-3">
      {/* Centered Tabs */}
      <div className="flex justify-center" dir={Lang === "ar" ? "rtl" : "ltr"}>
        <TETabs>
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
    </div>
  );
}
