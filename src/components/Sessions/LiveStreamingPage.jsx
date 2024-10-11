import React, { useEffect, useState } from "react";
import "./Sesssion.css";
import liveStream from "../../images/liveStream.png";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const LiveStreamingPage = (Session) => {
  const [sessionId, setSessionId] = useState(null)
  const [sideTimer, setSideTimer] = useState(60 * 60);
  const [mainTimer, setMainTimer] = useState(86400 * 2);
  const [dataSession, setDataSession] = useState(86400 * 2);
  const [dis, setDis] = useState(false);
  const SingleSession = useParams();
  const token = localStorage.getItem("accessToken");
  let Session_id = Number(SingleSession?.SingleSession);
  let dateSection = new Date(`${dataSession?.date} ${dataSession?.time}`);
  let dateNew = new Date().getTime();
  let DateAll = dateSection - dateNew;
  const [timeLeft, setTimeLeft] = useState(DateAll > 0 ? DateAll : 0);
  let dataUser = JSON.parse(localStorage.getItem("user"));
  const teacherId = dataSession?.teacher?.id


  let nav = useNavigate();

  useEffect(() => {
    if (dataUser.type === "teacher") {
      setDis(false);
    } else {
      setDis(true);
    }
  }, [dataUser]);
  function handleDis() {
    if (dataUser.type === "teacher") {
      setDis(false);
    }
  }

  async function compeletSession() {
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
       toast.success("the session compeleted");
    } catch (error) {
      toast.error("the session is not Start");
    }
  }

  async function inCompeletSession() {
    try {
      const response = await axios.post(
        "https://yousab-tech.com/unihome/public/api/incomplete/session",
        { session_id: sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("the session incompeleted");
    } catch (error) {
      toast.error("the session is not Start");
    }
  }

  useEffect(() => {
    if (Session?.Session?.id) {
      setSessionId(Session.Session.id);
    }
  }, [])

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

  const handleBookingConfirm = async () => {
    try {
      let res = await axios.post(
        "https://yousab-tech.com/unihome/public/api/auth/session/store",
        { session_id: dataSession.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      nav("/Home");
    } catch (error) {
      console.error("Error during booking confirmation:", error);
    }
  };

  useEffect(() => {
    let sessions = async () => {
      try {
        let response = await axios.get(
          "https://yousab-tech.com/unihome/public/api/auth/sessions",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        let Session = response.data.data.sessions;
        setDataSession(Session.find((e) => (e.id = Session_id)));
      } catch (error) {
      }
    };
    sessions();
  }, []);
  useEffect(() => {
    // Disable outside scroll when component mounts
    document.body.style.overflow = "hidden";

    // Side Timer Countdown (60 minutes)
    const sideInterval = setInterval(() => {
      setSideTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Main Timer Countdown (for days, hours, minutes, seconds)
    const mainInterval = setInterval(() => {
      setMainTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clean up: Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
      clearInterval(sideInterval);
      clearInterval(mainInterval);
    };
  }, []);

  // Format time from seconds to hours, minutes, seconds
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // Format time for main content countdown (days, hours, minutes, seconds)
  const formatMainTime = (timeInSeconds) => {
    const days = Math.floor(timeLeft / (1000 * 24 * 60 * 60));
    const hours = Math.floor(
      (timeLeft % (1000 * 24 * 60 * 60)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${String(days).padStart(2, "0")}:${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const { t } = useTranslation();

  return (
    <>
     <Helmet>
            <title>Live Session - UniHome</title>
            <meta name="description" content="Join our live English sessions with professional tutors at UniHome. Enhance your speaking skills and gain confidence in real-time!" />
            <meta name="keywords" content="UniHome, live session, English learning, online classes, interactive learning, professional tutors, speaking skills, language practice" />
            <meta name="author" content="UniHome" />
            <meta property="og:title" content="Live Session - UniHome" />
            <meta property="og:description" content="Participate in live English sessions with experienced tutors at UniHome. Sign up today to boost your speaking skills!" />
            <meta property="og:image" content="/src/components/Assets/images/UniHome.png" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ar_EG" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Live Session - UniHome" />
            <meta name="twitter:description" content="Join live English sessions at UniHome to enhance your speaking skills with professional tutors." />
            <meta name="twitter:image" content="/src/components/Assets/images/UniHome.png" />
        </Helmet>
    <div className="liveStream">
      {/* Main Content Area */}
      <main className="mainContent">
        <div className="bg-transparent w-full h-full rounded-none lg:rounded-lg relative">
          <div className="w-full h-full">
            {/* Session Start Background */}
            <div className="live_screen">
              <div className="my-3 flex justify-center">
                <div className="py-4 text-white rounded-lg text-md w-fit">
                  <span className="shadow_in">
                    {formatMainTime(mainTimer).split(":")[0]} {/* Days */}
                  </span>
                  <span className="mx-1 sm:mx-2">:</span>
                  <span className="shadow_in">
                    {formatMainTime(mainTimer).split(":")[1]} {/* Hours */}
                  </span>
                  <span className="mx-1 sm:mx-2">:</span>
                  <span className="shadow_in">
                    {formatMainTime(mainTimer).split(":")[2]} {/* Minutes */}
                  </span>
                  <span className="mx-1 sm:mx-2">:</span>
                  <span className="shadow_in">
                    {formatMainTime(mainTimer).split(":")[3]} {/* Seconds */}
                  </span>
                </div>
              </div>
              <Link
                to="/Session/:SingleSession/VideoConference"
                disabled={dis}
                onClick={handleDis}
                className="flex disabled:border-none disabled:transform-none disabled:bg-slate-500 items-center justify-center text-white text-lg rounded-3xl py-2 px-4 font-bold bg-blue-600 border-b-4 border-blue-800 transition-transform duration-300 hover:border-b-0 hover:translate-y-0.5 active:outline-none active:bg-blue-700 active:scale-95"
              >
                {t("Start Lesson")}
              </Link>
            </div>

            <div className="h-[67vh] lg:h-full bg-gray-200 rounded-lg">
              <div className="w-full h-full rounded-lg bg-gray-400">
                <img
                  src={liveStream}
                  alt="live"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chat Section */}
      <aside className="side_content relative">
        <ul className="space-y-4">
          <Link
            to="/Dashboard">
            <FontAwesomeIcon className="text-orange-500 text-2xl rtl:left-0 ltr:right-0  top-0 absolute p-3" icon={faCircleXmark} />
          </Link>
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div>
              {/* Profile Avatar */}
              <img
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-3xl"
                src={dataSession?.teacher?.image}
                alt="User Avatar"
              />
            </div>
            <div>
              {/* User Name & Country */}
              <h2 className="text-black font-bold text-lg">Teacher</h2>
              <h2 className="text-gray-700 font-bold text-md">
                {dataSession?.teacher?.firstname} {dataSession?.teacher?.lastname}
              </h2>
              <p className="text-gray-400 text-sm">{dataSession?.teacher?.country}</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-4">{t("Lesson Details")}:</h3>
          <div className="bg-gray-100 p-3 rounded-lg">
            <h3 className="text-gray-700">
              {t("Status")} :{" "}
              {sideTimer > 0 ? (
                <span className=" text-green-700">{t("Available")}</span>
              ) : (
                <span className=" text-red-700">{t("not Available")}</span>
              )}
            </h3>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <h3 className="text-gray-700">
              {t("Details")} : <span className="text-black">{t("60 Minutes Of Lesson")}</span>
            </h3>
          </div>
          <div className="my-2 flex justify-center">
            <div className="py-4 bg-white text-black rounded-lg text-md w-fit">
              <span className="shadow_in">
                {formatTime(sideTimer).split(":")[0]}
              </span>
              <span className="mx-1 sm:mx-2">:</span>
              <span className="shadow_in">
                {formatTime(sideTimer).split(":")[1]}
              </span>
              <span className="mx-1 sm:mx-2">:</span>
              <span className="shadow_in">
                {formatTime(sideTimer).split(":")[2]}
              </span>
            </div>
          </div>
          <div className="my-3 flex sm:justify-center justify-start flex-wrap items-center gap-3">
            <button
              onClick={() => {
                compeletSession();
                handleBookingConfirm();
              }}

              className="flex items-center text-white text-lg rounded-3xl py-1 px-3 font-bold bg-blue-600 border-b-4 border-blue-800 transition-transform duration-300 hover:border-b-0 hover:translate-y-0.5 active:outline-none active:bg-blue-700 active:scale-95"
            >
              {t("End Lesson")}
            </button>
            {dataUser.type === "teacher" ?
              <Link
                to="/addQuestion"
                className="flex items-center justify-center text-white text-lg rounded-3xl py-1 px-3 font-bold bg-green-600 border-b-4 border-green-800 transition-transform duration-300 hover:border-b-0 hover:translate-y-0.5 active:outline-none active:bg-green-700 active:scale-95">
                {t("Create Quiz")}
              </Link> : null
            }
            <button
              onClick={() => inCompeletSession()}
              className="flex items-center justify-center text-white text-lg rounded-3xl py-1 px-3 font-bold bg-orange-500 border-b-4 border-orange-800 transition-transform duration-300 hover:border-b-0 hover:translate-y-0.5 active:outline-none active:bg-orange-700 active:scale-95">
              {t("Cut Lesson")}
            </button>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <h3 className="text-gray-700 mb-3">{t("Actions")}</h3>
            <Link
              to={`/chat?id=${teacherId}`}
              className="p-3 bg-orange-500 me-3 rounded-full hover:scale-110 transition-all duration-500">
              <span className="text-white font-bold">{t("message")}</span>
            </Link>
          </div>
        </ul>
      </aside>
    </div>
    </>
  );
};

export default LiveStreamingPage;
