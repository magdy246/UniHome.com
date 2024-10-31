import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import countries from "../flag.json";
import { Link } from "react-router-dom";
import { t } from "i18next";

// Utility function to convert 24-hour time to 12-hour format with AM/PM
const convertTo12HourFormat = (time24) => {
  let [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert '0' hour to '12' for AM
  // Pad single-digit hour with leading zero
  const hour12 = hour.toString().padStart(2, "0");
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// Utility function to add one hour to a 24-hour time string
const addOneHour = (time24) => {
  let [hour, minute] = time24.split(":").map(Number);
  hour = (hour + 1) % 24; // Ensure the hour wraps around if it exceeds 23
  // Pad single-digit hour with leading zero
  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};

const InCompeleted = (Session) => {


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
    return country ? country.flag : ""; // Return the flag or an empty string if not found
  };

  const dateSession = new Date(Session.Session.session_table.created_at);
  const date = dateSession.toLocaleDateString();

  const startTime = Session.Session.session_table.time;
  const endTime = addOneHour(startTime);
  const formattedStartTime = convertTo12HourFormat(startTime);
  const formattedEndTime = convertTo12HourFormat(endTime);

  const userCookie = localStorage.getItem("user");
  const dataUser = userCookie ? JSON.parse(userCookie) : null;

  const [userType, setUserType] = useState(null);
  const teacherId = userType?.id

  useEffect(() => {
    if (dataUser.type === "student") {
      setUserType(Session?.Session?.teacher)
    } else {
      setUserType(Session?.Session?.student)
    }
  }, [dataUser.type]);

  let Status = Session?.Session?.status
  if (Status === "InCompleted" || Status === "inCompleted") {
    Status = "InCompleted";
  } else {
    return null;
  }

  return (
    <div className="p-4" dir={Lang === "ar" ? "ltr" : "ltr"}>
      <div className="bg-white rounded-lg shadow-md px-6 py-10 mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl mt-6 relative">
        {/* Date Styled Inside the Card */}
        <div className={`absolute top-0 ${Lang === "ar" ? "right-0" : "left-0"}  p-2 bg-gray-200 text-gray-600 rounded-br-lg shadow-md`}>
          <p className="text-sm font-semibold">{t("Date")}: {date}</p>
        </div>
        {/* User Info & Countdown Timer */}
        <div className="for_book">
          {/* User Info */}
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div>
              {/* Profile Avatar */}
              <img
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl"
                src={userType?.image} // Placeholder for Avatar
                alt="User Avatar"
              />
            </div>
            <div className="capitalize">
              {/* User Name & Country */}
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {userType?.firstname} {userType?.lastname}
              </h2>
              <p className="flex items-center font-bold text-gray-600 text-md px-2 py-1 bg-gray-200 w-fit rounded-lg ring-2 ring-gray-500">
                <span className="mx-2"><img className="w-8 rounded-sm" src={getCountryFlag(userType?.country)} alt="flag" /></span>
                {t(userType?.country)}
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="my-3 flex justify-center items-center bg-gray-100 p-4 rounded-lg">
            <div className="text-center flex ">
              <h3 className="text-gray-500 text-sm lg:text-base p-3 flex justify-center items-center">
                {t("Details")}
              </h3>
              <div className="border-s-2 border-black px-3">
                <p className="text-gray-800 font-medium">
                  <span className="text-black font-bold">
                    {t("Time")}: {formattedStartTime} <p>to: {formattedEndTime}</p>
                  </span>
                </p>
                <p className="text-gray-800 font-medium">
                  {t("Date")}: {Session?.Session?.session_table?.date}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scheduled Actions */}
        <div className="text-center mb-6 bg-gray-100 p-3 rounded-lg flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0">
          <div className="text-center capitalize">
            <h3 className="text-gray-500 text-sm lg:text-base">{t("status")}</h3>
            <p className=" text-green-500 font-bold">{Status}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm lg:text-base mb-3">{t("Actions")}</h3>
            <div className="flex flex-wrap justify-center space-x-2">
              <Link
                to={`/chat?id=${teacherId}`}
                className="p-2 sm:p-3 bg-orange-500 rounded-full hover:scale-110 transition-all duration-500">
                <AiOutlineMessage className="text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InCompeleted;
