import { Link, useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiFillStar, AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import Avatar from "../images/profileImage.png";
import Reviews from "./Reviews/Reviews";
import countries from "./flag.json";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function Teacher() {
  const [dataApi, setDataApi] = useState(null);
  const [events, setEvents] = useState([]);
  const [popupEvent, setPopupEvent] = useState(null);
  const [session, setSession] = useState([]);
  const [singleSession, setSingleSession] = useState({});
  const { Teacher } = useParams();
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);

  const getCountryFlag = (countryName) => {
    const country = countries.find((c) => c.country === countryName);
    return country ? country.flag : "";
  };

  const Teacher_id = Number(Teacher);
  const token = localStorage.getItem("accessToken");

  async function getData() {
    try {
      let response = await axios.get(
        `https://yousab-tech.com/unihome/public/api/reviews/${Teacher_id}`
      );
      setData(response.data.data.reviews);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, [Teacher_id]);


  const totalRate = data.reduce((sum, review) => sum + review.rate, 0);
  let averageRate = (totalRate / data.length).toFixed(1);
  if (averageRate === "NaN") {
    averageRate = 0
  }

  // Fetch teacher data
  useEffect(() => {
    const apiData = async () => {
      try {
        const res = await axios.get(
          `https://yousab-tech.com/unihome/public/api/teacher/${Teacher_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = res?.data?.data?.user;
        setDataApi(userData);
        console.log(userData);

        // Sessions data for FullCalendar
        if (userData?.sessions.length > 0) {
          const sessionEvents = userData.sessions.map((session) => {
            setDate(session.date)
            const startDate = new Date(
              `${session.date}T${session.time}`
            );
            const endDate = new Date(`${session.date}T${session.time}`);
            return {
              id: session.id,
              start: startDate,
              end: endDate,
              title: session.title,
              status: session.status,
              sessionBreak: session.break,
              sessionDate: session.date
            };
          });
          setSession(userData.sessions);
          setEvents(sessionEvents);
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    apiData();
  }, [Teacher_id, token]);

  // Customize event display
  const eventContent = (eventInfo) => {
    const { status, sessionBreak, sessionDate } = eventInfo.event.extendedProps;
    const currentDate = new Date();
    const sessionDateObj = new Date(sessionDate);
    const counter = currentDate <= sessionDateObj ? 0 : 1;
    let backgroundColor;

    if (sessionBreak === 1) {
      backgroundColor = "blue";
    } else if (counter === 1) {
      backgroundColor = "red"; // Booked session color
    } else {
      backgroundColor = status === 1 ? "red" : "green";
    }

    return (
      <div className="relative select-none">
        <div
          className="h-full min-w-full"
          style={{
            backgroundColor,
            color: "white",
            padding: "13px",
            cursor: "pointer"
          }}
        >
          {sessionDate}
        </div>
      </div>
    );
  };

  // Handle event click
  const handleEventClick = (info) => {
    const { sessionBreak, sessionDate } = info.event.extendedProps;
    const currentDate = new Date();
    const sessionDateObj = new Date(sessionDate);
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const sessionTime = `${sessionDateObj.getHours()}:${sessionDateObj.getMinutes()}:${sessionDateObj.getSeconds()}`;
    const counter = currentTime <= sessionTime ? 0 : 1;
    const eventData = info.event.extendedProps;
    const eventId = Number(info.event._def.publicId);
    const singleSession = session.find((e) => e.id === eventId);

    // Check if the session is booked
    if (counter === 1 || sessionBreak === 1) {
      toast.error(t("You can't book this session"));
    } else if (singleSession?.status === 0) {
      setPopupEvent(eventData);
      setSingleSession(singleSession);
    } else {
      toast.error(t("This session is already booked."));
    }
  };


  // Confirm booking
  const handleBookingConfirm = async () => {
    try {
      await axios.post(
        "https://yousab-tech.com/unihome/public/api/auth/session/store",
        { sessiontable_id: singleSession.id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPopupEvent(null);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === singleSession.id ? { ...event, status: 1 } : event
        )
      );

    } catch (error) {
      toast(
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm font-medium">
            {t("Transaction successful! But if you don't have money in your wallet the session will be never Booked")}
          </p>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-3xl hover:bg-blue-600"
            onClick={() => toast.dismiss()}
          >
            {t("Ok")}
          </button>
        </div>,
        {
          duration: 6000
        }
      );
    }
  };

  const embedLink =
    dataApi?.youtube_link?.replace("watch?v=", "embed/") ||
    "https://www.youtube.com/embed/MdWOdQVneZY";

  const { t } = useTranslation();
  const Popup = ({ event, onClose }) => {
    if (!event) return null;

    return (
      <div className="popup-overlay profile-tether z-50" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <h3>{event.title}</h3>
          <p>
            Date: {event.sessionDate ? event.sessionDate : "No date available"}
          </p>
          <p>Status: {event.status === 0 ? "Available" : "Unavailable"}</p>
          <div className="mt-4">
            <button
              onClick={() => {
                onClose();
                handleBookingConfirm();
              }}
              className="px-4 py-2 mx-2 text-white bg-green-500 rounded"
            >
              {t("Confirm Booking")}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 ml-2 text-white bg-gray-500 rounded"
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getCalendarView = () => {
    const width = window.innerWidth;
    if (width <= 480) return "timeGridThreeDay"; // Mobile: 3-day view
    if (width <= 768) return "timeGridFiveDay";  // Tablet: 5-day view
    return "timeGridWeek";                       // Desktop: full week view
  };

  const [calendarView, setCalendarView] = useState(getCalendarView);

  useEffect(() => {
    const handleResize = () => setCalendarView(getCalendarView);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customViews = {
    timeGridThreeDay: {
      type: "timeGrid",
      duration: { days: 3 },
      buttonText: "3 days",
    },
    timeGridFiveDay: {
      type: "timeGrid",
      duration: { days: 5 },
      buttonText: "5 days",
    },
  };

  return (
    <>
      <Helmet>
        <title>{`${dataApi?.firstname} - English Teacher at UniHome`}</title>
        <meta name="description" content={`Learn English with ${dataApi?.firstname}, a professional English tutor at UniHome.${dataApi?.intro} `} />
        <meta name="keywords" content={`UniHome, ${dataApi?.firstname}, English teacher, professional tutor, learn English, English lessons, personalized learning`} />
        <meta name="author" content={dataApi?.firstname} />
        <meta property="og:title" content={`${dataApi?.firstname} - English Teacher at UniHome`} />
        <meta property="og:description" content={`Meet ${dataApi?.firstname}, a professional tutor at UniHome.Learn English with personalized lessons and flexible scheduling.`} />
        <meta property="og:image" content={dataApi?.image} />
        <meta property="og:url" content="https://unih0me.com/teachers" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="./Assets/Favicon/apple-touch-icon.png" />
        <meta name="twitter:title" content={`${dataApi?.firstname} - English Teacher at UniHome`} />
        <meta name="twitter:description" content={`Learn English with ${dataApi?.firstname}. Book personalized lessons today!`} />
        <meta name="twitter:image" content={dataApi?.image} />
        <link rel="canonical" href={`https://unih0me.com/teachers/${dataApi?.firstname}`} />
      </Helmet >
      <section className="py-6">
        <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
          {/* Video Section */}
          <div className="mb-6">
            <iframe
              src={embedLink}
              title="Teacher Introduction Video"
              className="w-full aspect-video rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Teacher Information */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div dir="ltr" className="flex items-start mb-4">
              <img
                src={dataApi?.image || Avatar}
                alt="Teacher Avatar"
                className="w-24 h-24 rounded-3xl border-2 border-gray-300 shadow-sm mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {dataApi?.firstname} {dataApi?.lastname}
                </h2>
                <p className="flex items-center font-bold text-gray-600 text-md px-2 py-1 bg-gray-200 w-fit rounded-lg ring-2 ring-gray-500">
                  <span className="mx-2"><img className="w-8 rounded-sm" src={getCountryFlag(dataApi?.country)} alt="flag" /></span>
                  {t(dataApi?.country)}
                </p>
              </div>
            </div>
            <div className="flex items-center text-yellow-400 text-lg mb-4">
              <AiFillStar className="mr-1" />
              <span className="font-semibold text-yellow-500">({dataApi?.review} {t("Reviews")})</span>
            </div>

            <div className="text-center mb-4">
              <p className="text-xl font-bold text-gray-700">
                {t("Hourly Rate")}:{" "}
                <span className="text-green-600 font-extrabold">{t("EGP")} {dataApi?.start_from}.00</span>
              </p>
            </div>

            <div className="flex justify-around mt-4">
              <div className="text-center">
                <BsPeople className="text-4xl text-yellow-500 mb-2 mx-auto" />
                <p className="text-gray-800 font-semibold">
                  <span className="block text-3xl">{dataApi?.students === null || dataApi?.students === undefined ? "0" : dataApi?.students}</span>{" "}
                  {t("Students")}
                </p>
              </div>
              <Link to={`/chat?id=${Teacher_id}`}>
                <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-transform duration-300 transform bg-blue-600 rounded-lg shadow hover:scale-105">
                  <AiOutlineMessage className="mx-1" />
                  {t("message")}
                </button>
              </Link>
              <div className="text-center">
                <FaChalkboardTeacher className="text-4xl text-yellow-500 mb-2 mx-auto" />
                <p className="text-gray-800 font-semibold">
                  <span className="block text-3xl">{dataApi?.lessons || "0"}</span>{" "}
                  {t("Sessions")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{t("About Me")}</h3>
            <p className="mt-3 text-sm text-center text-gray-700 sm:text-base sm:mt-4 lg:text-left">
              {dataApi?.intro || "No introduction available."}
            </p>
          </div>

          {/* New Dashboard Section */}
          <div className="block w-full m-auto sm:mt-4">
            {/* Legend for Booked and Available */}
            <div dir="ltr" className="flex justify-center space-x-4 mb-2 font-bold select-none">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-5 rounded-sm bg-red-500"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-5 rounded-sm bg-green-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-5 rounded-sm bg-blue-600"></div>
                <span>Break</span>
              </div>
            </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek",
              }}
              weekends={true}
              initialView={calendarView}
              views={customViews}
              events={events}
              eventClick={handleEventClick}
              eventContent={eventContent}
              scrollTime="00:00:00"
              dayHeaders={true}
              nowIndicator={true}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              timeZone="local" // Setting timezone to Tunisia
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <Reviews teacher={Teacher_id} />
          </div>

          {/* Popup for event details */}
          {popupEvent && (
            <Popup event={popupEvent} onClose={() => setPopupEvent(null)} />
          )}
        </div>
      </section>
    </>
  );
}
