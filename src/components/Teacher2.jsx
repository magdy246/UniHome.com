// import { Link, useParams } from "react-router-dom";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { AiOutlineBook, AiOutlineMessage } from "react-icons/ai";
// import {
//   FaChalkboardTeacher,
//   FaFacebook,
//   FaFlag,
//   FaLanguage,
//   FaLinkedin,
//   FaTwitter,
//   FaUserGraduate,
// } from "react-icons/fa";
// import Reviews from "./Reviews/Reviews";
// import Modal from "react-modal";

// // إعدادات النافذة المنبثقة
// Modal.setAppElement("#root");

// export default function Teacher() {
//   const [dataApi, setDataApi] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [popupEvent, setPopupEvent] = useState(null);
//   const [session, setSession] = useState({});
//   const [singleSession, setSingleSession] = useState({});
//   let { Teacher2 } = useParams();
//   // console.log(Teacher2);

//   let Teacher_id = Number(Teacher2);
//   let token = Cookies.get("accessToken");
//   console.log(dataApi);

//   // جلب بيانات المعلم
//   useEffect(() => {
//     const apiData = async () => {
//       try {
//         const res = await axios.get(
//           `https://unih0me.com/api/teacher/${Teacher_id}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setDataApi(res?.data?.data?.user);

//         const sessions = res?.data?.data?.user?.sessions;
//         console.log(sessions);

//         setSession(res?.data?.data?.user?.sessions);
//         const sessionEvents = sessions.map((session) => {
//           const startDate = new Date(`${session.date}T${session.time}`);
//           const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // افتراض انتهاء الجلسة بعد ساعة

//           return {
//             id: session.id,
//             start: startDate,
//             end: endDate,
//             title: session.title,
//             status: session.status,
//           };
//         });
//         setEvents(sessionEvents);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     apiData();
//   }, [Teacher_id, token]);

//   // جلب بيانات الجلسات وتحويلها إلى أحداث للتقويم

//   // تخصيص أسلوب عرض الأحداث
//   const eventContent = (eventInfo) => {
//     const { status } = eventInfo.event.extendedProps;

//     const backgroundColor = status === 0 ? "green" : "red"; // اللون بناءً على الحالة

//     return (
//       <div className="relative select-none">
//         <div
//           className="h-full min-w-full"
//           style={{
//             backgroundColor,
//             color: "white",
//             borderRadius: "100",
//             padding: "11px",
//           }}
//         >
//           {eventInfo.event.title}
//         </div>
//       </div>
//     );
//   };

//   // التعامل مع اختيار الحدث
//   const handleEventClick = (info) => {

//     const eventData = info.event.extendedProps;
//     console.log(info);
//     let id = Number(info.event._def.publicId);

//     let singleSession = session.find((e) => e.id === id);
//     console.log(singleSession);
//     setSingleSession(singleSession);

//     // setSession();
//     if (eventData.status === 0) {
//       setPopupEvent(eventData);
//     } else {
//       alert("This session is already booked.");
//     }
//   };

//   // تأكيد الحجز

//   const handleBookingConfirm = async () => {
//     console.log(singleSession.id);

//     try {
//       let res = await axios.post(
//         "https://unih0me.com/api/auth/session/store",
//         {
//           sessiontable_id: singleSession.id,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("تم الحجز بنجاح!");
//       if (popupEvent && popupEvent.status === 0) {
//         setPopupEvent(null); // أغلق النافذة بعد تأكيد الحجز
//       }
//       // تحديث الحالة في الجدول لتجنب تكرار الحجز

//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
          
         
//           event.id === popupEvent.id ? { ...event, status: 1 } : event
//         )
//       );
//     } catch (error) {
//       console.log("حدث خطأ أثناء الحجز:", error.response.data.data);
//     }
//   };

//   // رابط الفيديو
//   let embedLink = dataApi?.youtube_link?.replace("watch?v=", "embed/");

//   Teacher = dataApi?.id;

//   const Popup = ({ event, onClose }) => {
//     if (!event) return null;

//     return (
//       <div className="popup-overlay profile-tether" onClick={onClose}>
//         <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//           <h3>{event.title}</h3>
//           <p>
//             Date: {event.start ? event.start.toString() : "No date available"}
//           </p>
//           <p>Status: {event.status === 0 ? "Unavailable" : "Available"}</p>
//           <div className="mt-4">
//             <button
//               onClick={() => {
//                 onClose(); // Close the popup
//                 handleBookingConfirm(); // Confirm the booking
//               }}
//               className="px-4 py-2 text-white bg-green-500 rounded"
//             >
//               Confirm Booking
//             </button>
//             <button
//               onClick={onClose}
//               className="px-4 py-2 ml-2 text-white bg-gray-500 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {embedLink && (
//         <div className="mt-2 m-auto mb-5 videoInstructor d-flex justify-content-center">
//           <iframe
//             width="700"
//             height="350"
//             src={embedLink}
//             title="YouTube video player"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </div>
//       )}

//       <div>
//         <div className="text-center  text-black lg:text-left">
//           <img
//             src={dataApi?.image}
//             alt="avatar"
//             className=" w-40 rounded-full"
//           />

//           <div className="flex flex-wrap items-center justify-start mt-3 lg:justify-start">
//             <p className="px-2 block py-1 mb-2 mr-2 text-xs text-white bg-green-500 rounded-md lg:mb-0">
//               FEATURED
//             </p>
//             <FaFlag className="ml-2 text-blue-500" />
//           </div>
//           <h2 className="text-xl text-start font-bold sm:text-2xl">
//             {dataApi?.firstname || "Teacher's Name"}
//           </h2>
//           <p className="flex items-center justify-start mt-1 text-sm text-gray-500 sm:text-base lg:justify-start sm:mt-2">
//             <FaChalkboardTeacher className="mr-1" /> Egypt
//           </p>
//           <p className="flex items-center justify-start mt-1 text-sm text-gray-500 sm:text-base lg:justify-start sm:mt-2">
//             <FaUserGraduate className="mr-1" /> Lessons {dataApi?.lessons}{" "}
//             Students {dataApi?.type}
//           </p>

//           <p className="flex items-center justify-start mt-1 text-sm text-gray-500 sm:text-base lg:justify-start sm:mt-2">
//             <FaLanguage className="mr-1" /> {dataApi?.languages}
//           </p>
//         </div>
//       </div>
//       <p className="mt-3 text-sm text-center text-gray-700 sm:text-base sm:mt-4 lg:text-left">
//         {dataApi?.description}
//       </p>
//       <div className="flex items-center justify-start mt-3 lg:justify-start sm:mt-4">
//         <FaTwitter className="mr-3 text-blue-500 cursor-pointer sm:mr-4" />
//         <FaLinkedin className="mr-3 text-blue-700 cursor-pointer sm:mr-4" />
//         <FaFacebook className="text-blue-600 cursor-pointer" />
//       </div>
//       <div className="grid grid-cols-2 gap-2 mt-4 sm:mt-5 md:mt-6 sm:flex sm:flex-wrap sm:gap-3 md:gap-4">
//         <Link to={`/calendar/${Teacher_id}`}>
//           <button className="flex items-center justify-start px-3 py-2 text-sm font-medium text-white transition-transform duration-300 transform bg-green-500 rounded-lg sm:px-4 sm:text-base hover:scale-105">
//             <AiOutlineBook className="mr-1" />
//             Book Now
//           </button>
//         </Link>

//         <Link
//           to={`/chat?id=${Teacher_id}&image=${dataApi?.image}&firstName=${dataApi?.firstname}`}
//         >
//           <button className="flex items-center justify-start px-3 py-2 text-sm font-medium text-white transition-transform duration-300 transform bg-blue-500 rounded-lg sm:px-4 sm:text-base hover:scale-105">
//             <AiOutlineMessage className="mr-1" />
//             Message
//           </button>
//         </Link>
//       </div>
//       <div className="mt-6 sm:mt-7 md:mt-8">
//         <h3 className="mb-3 text-base font-semibold text-center sm:text-lg sm:mb-4 lg:text-left">
//           Reviews
//         </h3>
//       </div>
//       <div className="p-5">
//         <hr className="border border-[#dfdfdf]" />
//         <div className="p-2">
//           <h3 className="mb-1 text-4xl font-bold text-gray-900 dark:text-white">
//             Availability
//           </h3>
//           <div>
//             <div className="z-0 height600 relative">
//               <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                 initialView="timeGridWeek"
//                 events={events} // تأكد من تمرير الأحداث هنا
//                 eventContent={eventContent}
//                 eventClick={handleEventClick}
//                 selectable
//                 contentHeight={500}
//               />
//             </div>
//           </div>
//           <div>
//             <Reviews teacher={Teacher_id} />
//           </div>
//         </div>
//       </div>

//       {/* نافذة منبثقة للحجز */}
//       {popupEvent && (
//         <Popup event={popupEvent} onClose={() => setPopupEvent(null)} />
//       )}
//     </div>
//   );
// }
