import { Link, useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiFillStar, AiOutlineMessage } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import Avatar from "../images/profileImage.png";
import Reviews from "./Reviews/Reviews";
import countries from "./flag.json";
import { Helmet } from 'react-helmet';
import { useTranslation } from "react-i18next";

export default function Teacher() {
  const [dataApi, setDataApi] = useState(null);
  const [events, setEvents] = useState([]);
  const [popupEvent, setPopupEvent] = useState(null);
  const [session, setSession] = useState([]);
  const [singleSession, setSingleSession] = useState({});
  const { Teacher } = useParams();
  const [data, setData] = useState([]);

  const getCountryFlag = (countryName) => {
    const country = countries.find((c) => c.country === countryName);
    return country ? country.flag : "";
  };

  const Teacher_id = Number(Teacher);
  const token = Cookies.get("accessToken");

  async function getData() {
    try {
      let response = await axios.get(
        `https://yousab-tech.com/unihome/public/api/reviews/${Teacher_id}`
      );
      setData(response.data.data.reviews);
      console.log(response.data.data.reviews);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getData()
  }, [])

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

        // Sessions data for FullCalendar
        if (userData?.sessions.length > 0) {
          const sessionEvents = userData.sessions.map((session) => {
            const startDate = new Date(
              `${session.startdate}T${session.starttime}`
            );
            const endDate = new Date(`${session.enddate}T${session.endtime}`);
            return {
              id: session.id,
              start: startDate,
              end: endDate,
              title: "Available Session",
              status: session.status,
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
    const { status } = eventInfo.event.extendedProps;
    const backgroundColor = status === 0 ? "green" : "red";
    return (
      <div className="relative select-none">
        <div
          className="h-full min-w-full"
          style={{
            backgroundColor,
            color: "white",
            borderRadius: "100",
            padding: "11px",
          }}
        >
          {eventInfo.event.title}
        </div>
      </div>
    );
  };

  // Handle event click
  const handleEventClick = (info) => {
    const eventData = info.event.extendedProps;
    const eventId = Number(info.event._def.publicId);
    const singleSession = session.find((e) => e.id === eventId);

    if (singleSession?.status === 0) {
      setPopupEvent(eventData);
      setSingleSession(singleSession);
    } else {
      alert("This session is already booked.");
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
      console.error("Error during booking confirmation:", error);
    }
  };

  const embedLink =
    dataApi?.youtube_link?.replace("watch?v=", "embed/") ||
    "https://www.youtube.com/embed/dQw4w9WgXcQ";

  const { t } = useTranslation();
  const Popup = ({ event, onClose }) => {
    if (!event) return null;
    return (
      <div className="popup-overlay profile-tether" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <h3>{event.title}</h3>
          <p>
            Date: {event.start ? event.start.toString() : "No date available"}
          </p>
          <p>Status: {event.status === 0 ? "Available" : "Unavailable"}</p>
          <div className="mt-4">
            <button
              onClick={() => {
                onClose();
                handleBookingConfirm();
              }}
              className="px-4 py-2 text-white bg-green-500 rounded"
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
  return (
    <>
      <Helmet>
        <title>Teachers</title>
        <meta name="description" content="تعرّف على مدرسين محترفين يقدّمون دروسًا خاصة عبر الإنترنت. احصل على دعم تعليمي مخصص يساعدك على تحقيق أهدافك الأكاديمية." />

      </Helmet>
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
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center mb-4">
              <img
                src={dataApi?.image || Avatar}
                alt="Teacher Avatar"
                className="w-20 h-20 rounded-3xl mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {dataApi?.firstname} {dataApi?.lastname}
                </h2>
                <p className="flex items-center text-gray-600">
                  <span className="mr-1">{getCountryFlag(dataApi?.country)}</span>
                  {dataApi?.country}
                </p>
              </div>
            </div>
            <div className="flex items-center text-yellow-300 text-lg mb-4">
              <AiFillStar className="mr-1" />
              <span className="text-yellow-500">{averageRate} ({data.length} {t("Reviews")})</span>
            </div>

            <div className="text-center mb-4">
              <p className="text-xl font-semibold text-gray-700">
                {t("Hourly Rate")}:{" "}
                <span className="text-green-600">{t("EGP")} {dataApi?.balance}.00</span>
              </p>
            </div>

            <div className="flex justify-around">
              <div className="text-center">
                <BsPeople className="text-3xl text-yellow-500 mb-2 mx-auto" />
                <p className="text-gray-800 font-semibold">
                  <span className="block text-2xl">{dataApi?.students}</span>{" "}
                  {t("Students")}
                </p>
              </div>
              <Link
                to={`/chat?id=${Teacher_id}`}
              >
                <button className="flex items-center justify-start px-3 py-2 text-sm font-medium text-white transition-transform duration-300 transform bg-blue-500 rounded-lg sm:px-4 sm:text-base hover:scale-105">
                  <AiOutlineMessage className="mr-1" />
                  {t("message")}
                </button>
              </Link>
              <div className="text-center">
                <FaChalkboardTeacher className="text-3xl text-yellow-500 mb-2 mx-auto" />
                <p className="text-gray-800 font-semibold">
                  <span className="block text-2xl">{dataApi?.sessions?.length}</span>{" "}
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
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek",
              }}
              initialView="timeGridWeek"
              events={events}
              eventClick={handleEventClick}
              eventContent={eventContent}
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
