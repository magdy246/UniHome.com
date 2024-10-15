import React, { useState, useEffect } from "react";
import "./Sesssion.css";
import { ImLoop2 } from "react-icons/im";
import { AiOutlineMessage } from "react-icons/ai";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import countries from "../flag.json";
import toast from "react-hot-toast";
import { t } from "i18next";

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
  const teacherId = Session?.Session?.teacher?.id

  let dateSection = new Date(`${Session.Session.session_table.date} ${Session.Session.session_table.time}`);
  let dateNew = new Date().getTime();
  let DateAll = dateSection - dateNew;

  const [timeLeft, setTimeLeft] = useState(DateAll > 0 ? DateAll : 0);
  const [sessionId, setSessionId] = useState(null)
  const dateSession = new Date(Session.Session.session_table.created_at);
  const date = dateSession.toLocaleDateString();
  const startTime = Session.Session.session_table.time;
  const endTime = addOneHour(startTime);
  const formattedStartTime = convertTo12HourFormat(startTime);
  const formattedEndTime = convertTo12HourFormat(endTime);


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


  const getCountryFlag = (countryName) => {
    const country = countries.find((c) => c.country === countryName);
    return country ? country.flag : "";
  };

  const token = localStorage.getItem("accessToken");

  async function cancelSession() {
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
      toast.success("the session cancelled");
    } catch (error) {
      toast.error("the session is already cancelled");

    }
  }

  // async function reschdeuleSession() {
  //   try {
  //     const response = await axios.post(
  //       "https://yousab-tech.com/unihome/public/api/reschdeule/session",
  //       { session_id: sessionId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     toast.success("Rebooking");
  //   } catch (error) {
  //     toast.error(error.response.data.message);

  //   }
  // }

  useEffect(() => {
    if (Session.Session.id) {
      setSessionId(Session.Session.id);
    }
  }, []);


  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) {
            return prevTimeLeft - 1000; // طرح 1000 مللي ثانية
          } else {
            clearInterval(timerId);
            return 0; // تأكد من عدم الذهاب إلى قيم سالبة
          }
        });
      }, 1000);

      return () => clearInterval(timerId); // تنظيف المؤقت عند الخروج
    }
  }, [timeLeft]);


  // Convert time left in seconds to days, hours, minutes, and seconds
  const days = Math.floor(timeLeft / (1000 * 24 * 60 * 60)).toString().padStart(2, '0');
  const hours = Math.floor((timeLeft % (1000 * 24 * 60 * 60)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');
  return (<>
    <div id={Session?.Session?.id} className="p-4" dir={Lang === "ar" ? "rtl" : "ltr"}>
      <div className="bg-white rounded-lg shadow-md px-6 py-10 mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl mt-6 relative">
        {/* Date Styled Inside the Card */}
        <div className={`absolute top-0 ${Lang === "ar" ? "right-0" : "left-0"}  p-2 bg-gray-200 text-gray-600 rounded-br-lg shadow-md`}>
          <p className="text-sm font-semibold">{t("Date")}: {date}</p>
        </div>

        {/* User Info & Countdown Timer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          {/* User Info */}
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div>
              {/* Profile Avatar */}
              <img
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl"
                src={Session?.Session?.teacher?.image} // Placeholder for Avatar
                alt="User Avatar"
              />
            </div>
            <div className="capitalize">
              {/* User Name & Country */}
              <h2 className="text-gray-800 font-bold text-sm sm:text-md lg:text-2xl">
              {Session?.Session?.teacher?.firstname} {Session?.Session?.teacher?.lastname}
              </h2>
              <p className="text-gray-500 text-sm lg:text-base">
                <span className="mr-1">{getCountryFlag(Session?.Session?.teacher?.country)}</span>
                {Session?.Session?.teacher?.country}
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="my-3 flex justify-center">
            <div className="mx-1 sm:mx-2 py-4 bg-white text-black rounded-lg text-md w-full sm:w-auto flex items-center justify-center space-x-2">
              <span className="shadow_in">{days}</span>
              <span className="mx-1 sm:mx-2">:</span>
              <span className="shadow_in">{hours}</span>
              <span className="mx-1 sm:mx-2">:</span>
              <span className="shadow_in">{minutes}</span>
              <span className="mx-1 sm:mx-2">:</span>
              <span className="shadow_in">{seconds}</span>
              {/* <span className="shadow_in"> {Session.Session.session_table.time}</span> */}
            </div>
          </div>
        </div>

        {/* Scheduled Actions */}
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
              {Session.Session.status === "canceled"
                ? "Cancelled"
                : Session.Session.status}
            </p>

          </div>
          <div>
            <h3 className="text-gray-500 text-sm lg:text-base mb-3">{t("Actions")}</h3>
            <div className="flex flex-wrap justify-center gap-2">

              <Link
                to={`/chat?id=${teacherId}`}
                className="p-2 sm:p-3 bg-orange-500 rounded-full hover:scale-110 transition-all duration-500">
                <AiOutlineMessage className="text-white" />
              </Link>

              <button
                onClick={() => cancelSession()}
                className="p-2 sm:p-3 bg-red-500 rounded-full hover:scale-110 transition-all duration-500">
                <RiCloseLargeFill className="text-white" />
              </button>

              {/* <button
                onClick={() => reschdeuleSession()}
                className="p-2 sm:p-3 bg-yellow-300 rounded-full hover:scale-110 transition-all duration-500">
                <ImLoop2 className="text-white" />
              </button> */}

            </div>
          </div>
        </div>

        {/* Join Lesson Button */}

        <Link
          to={`/Session/${Session?.Session?.id}`}
          className="my-3 flex justify-end h-11"
        >
          <button className="flex items-center justify-center text-white text-lg rounded-3xl py-2 px-4 font-bold bg-blue-600 border-b-4 border-blue-800 transition-transform duration-300 hover:border-b-0 hover:translate-y-0.5 active:outline-none active:bg-blue-700 active:scale-95">
            {t("Join Lesson")}
          </button>
        </Link>
      </div>
    </div>
  </>
  );
};

export default LessonCard;
