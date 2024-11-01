import React, { useState, useEffect } from "react";
import "./Sesssion.css";
import { AiOutlineMessage } from "react-icons/ai";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import countries from "../flag.json";
import toast from "react-hot-toast";
import { t } from "i18next";
import Notiflix from "notiflix";

const convertTo12HourFormat = (time24) => {
  let [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  const hour12 = hour.toString().padStart(2, "0");
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const addOneHour = (time24) => {
  let [hour, minute] = time24.split(":").map(Number);
  hour = (hour + 1) % 24;
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};

const LessonCard = (Session) => {
  const userCookie = localStorage.getItem("user");
  const dataUser = userCookie ? JSON.parse(userCookie) : null;

  let dateSection = new Date(`${Session?.Session?.session_table?.date} ${Session?.Session?.session_table?.time}`);
  let dateNew = new Date().getTime();
  let DateAll = dateSection - dateNew;

  const [timeLeft, setTimeLeft] = useState(DateAll > 0 ? DateAll : 0);
  const [sessionId, setSessionId] = useState(null);
  const dateSession = new Date(Session?.Session?.session_table?.created_at);
  const date = dateSession.toLocaleDateString();
  const startTime = Session?.Session?.session_table?.time;
  const endTime = addOneHour(startTime);
  const formattedStartTime = convertTo12HourFormat(startTime);
  const formattedEndTime = convertTo12HourFormat(endTime);
  const [userType, setUserType] = useState(null);
  const teacherId = userType?.id;

  useEffect(() => {
    if (dataUser.type === "student") {
      setUserType(Session?.Session?.teacher)
    } else {
      setUserType(Session?.Session?.student)
    }
  }, [dataUser.type]);

  const savedLang = localStorage.getItem("lang") || "en";
  const [Lang, setLang] = useState(savedLang);

  useEffect(() => {
    try {
      const parsedLang = JSON.parse(savedLang);
      setLang(parsedLang);
    } catch (error) {
      console.error("Failed to parse language from localStorage", error);
    }
  }, [savedLang]);

  const getCountryFlag = (countryName) => {
    const country = countries.find((c) => c.country === countryName);
    return country ? country.flag : "";
  };

  const token = localStorage.getItem("accessToken");

  async function cancelSession() {
    if (timeLeft <= 86400000) {
      Notiflix.Confirm.show(
        t('alert.noticeTitle'),
        t('alert.noticeMessage'),
        t('alert.noticeButton'),
        t(`Don't Cancel`),
        () => {
          // This function only runs if the "Understood" button is clicked
          confirmCancelSession();
        },
        () => {
          // This function runs if the "Do Not Cancel" button is clicked
          toast.success(t("Session not cancelled"));
        },
        {
          width: '380px',
          backgroundColor: 'linear-gradient(135deg, #f5faff, #dceffd)',
          titleColor: '#125b8d',
          messageColor: '#1a3e61',
          okButtonBackground: 'linear-gradient(135deg, #1d72b8, #125b8d)',
          okButtonColor: '#ffffff',
          cancelButtonBackground: '#d9534f',
          cancelButtonColor: '#ffffff',
          borderRadius: '16px',
          titleFontSize: '1.6rem',
          messageFontSize: '1.2rem',
          plainText: false,
        }
      );
      return;
    }
    // Proceed with cancellation if within allowed time
    confirmCancelSession();
  }

  async function confirmCancelSession() {
    try {
      const response = await axios.post(
        "https://yousab-tech.com/unihome/public/api/cancel/session",
        { session_id: sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("The session cancelled");
    } catch (error) {
      toast.error("The session is already cancelled");
    }
  }

  async function completeSession() {
    try {
      const response = await axios.post(
        "https://yousab-tech.com/unihome/public/api/complete/session",
        { session_id: sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      toast.success(t("The session completed successfully."));
    } catch (error) {
      toast.error(t("Error: The session is already completed."));
      console.error("Complete session error:", error);
    }
  }

  useEffect(() => {
    if (Session?.Session?.id) {
      setSessionId(Session?.Session?.id);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1000; // Subtract 1000 ms
          } else {
            clearInterval(timerId);
            return 0; // Stop timer at 0
          }
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const days = Math.floor(timeLeft / (1000 * 24 * 60 * 60)).toString().padStart(2, "0");
  const hours = Math.floor((timeLeft % (1000 * 24 * 60 * 60)) / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, "0");

  return (
    <>
      <div id={Session?.Session?.id} className="p-4" dir={Lang === "ar" ? "ltr" : "ltr"}>
        <div className="bg-white rounded-lg shadow-md px-6 py-10 mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl mt-6 relative">
          <div className={`absolute top-0 ${Lang === "ar" ? "right-0" : "left-0"}  p-2 bg-gray-200 text-gray-600 rounded-br-lg shadow-md`}>
            <p className="text-sm font-semibold">{t("Date")}: {date}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div>
                <img className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl" src={userType?.image} alt="User Avatar" />
              </div>
              <div className="capitalize">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {userType?.firstname} {userType?.lastname}
                </h2>
                <p className="flex items-center font-bold text-gray-600 text-md px-2 py-1 bg-gray-200 w-fit rounded-lg ring-2 ring-gray-500">
                  <span className="mx-2"><img className="w-8 rounded-sm" src={getCountryFlag(userType?.country)} alt="flag" /></span>
                  {t(userType?.country)}
                </p>
              </div>
            </div>

            <div className="my-3 flex justify-center">
              <div className="mx-1 sm:mx-2 py-4 bg-white text-black rounded-lg text-md w-full sm:w-auto flex items-center justify-center space-x-2">
                <span className="shadow_in">{days}</span>
                <span className="mx-1 sm:mx-2">:</span>
                <span className="shadow_in">{hours}</span>
                <span className="mx-1 sm:mx-2">:</span>
                <span className="shadow_in">{minutes}</span>
                <span className="mx-1 sm:mx-2">:</span>
                <span className="shadow_in">{seconds}</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-6 bg-gray-100 p-3 rounded-lg flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0">
            <div className="text-center">
              <h3 className="text-gray-500 text-sm lg:text-base">{t("Details")}</h3>
              <p className="text-gray-800 font-medium">
                <span className="text-black font-bold">
                  {t("Time")}: {formattedStartTime} <p>{t("to")}: {formattedEndTime}</p>
                </span>
              </p>
              <p className="text-gray-800 font-medium">
                {t("Date")}: {Session.Session.session_table.date}
              </p>
            </div>
            <div className="text-center capitalize">
              <h3 className="text-gray-500 text-sm lg:text-base">{t("Status")}</h3>
              <p className="text-green-500 font-bold">
                {Session?.Session?.status}
              </p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm lg:text-base mb-3">{t("Actions")}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to={`/chat?id=${teacherId}`} className="p-2 sm:p-3 bg-orange-500 rounded-full hover:scale-110 transition-all duration-500">
                  <AiOutlineMessage className="text-white" />
                </Link>

                <button onClick={cancelSession} className={`${timeLeft <= 86400000 ? "p-2 sm:p-3 bg-red-500 rounded-full hover:scale-110 transition-all duration-500" : "p-2 sm:p-3 bg-red-500 rounded-full hover:scale-110 transition-all duration-500"}`}>
                  <RiCloseLargeFill className="text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Link to={`/Session/${Session?.Session?.id}`} className="my-3 h-11 w-fit">
              <button
                onClick={dataUser.type === "teacher" ? () => { completeSession() } : null}
                className="flex items-center justify-center text-white text-lg rounded-3xl py-2 px-4 disabled:bg-gray-500 disabled:border-gray-700 disabled:active:bg-gray-700 font-bold bg-blue-600 border-b-4 border-blue-800 transition-transform duration-300 hover:border-b-0 hover:translate-y-0.5 active:outline-none active:bg-blue-700 active:scale-95"
                disabled={
                  Session?.Session?.status === "Cancelled" ||
                  (dataUser.type !== "teacher" || timeLeft > 0 || Session?.Session?.status !== "Completed")
                }
              >
                {t("Join Lesson")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonCard;