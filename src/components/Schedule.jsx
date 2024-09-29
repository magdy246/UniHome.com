import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "./hooks/useClickOutside";

const localizer = momentLocalizer(moment);

export default function Schedule({ events, forceUpdate, teacher }) {
  //* Managing the Events To Display Correctly On The Calendar
  const uniqueStartTimes = new Map();
  const displayedEvents = [];
  events?.forEach((event) => {
    const date = new Date(`${event.date}, ${event.time}`);
    const datePlusOneHour = new Date(date.getTime() + 60 * 60 * 1000); // Add 1 hour

    // Check if the start time is already used
    if (!uniqueStartTimes.has(date.getTime())) {
      displayedEvents.push({
        start: date,
        end: datePlusOneHour,
        title: event.title,
        status: event.status,
        id: event?.id,
      });
      uniqueStartTimes.set(date.getTime(), true); // Mark this start time as used
    }
  });
  //* The Closest Event
  const closestEvent = displayedEvents.find((event) => {
    return event.start >= Date.now() || event.end <= Date.now();
  });

  //* Managing the States
  const [date, setDate] = useState(closestEvent?.start || new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    //* Changing the Label Formate
    const label = document.querySelector(".rbc-toolbar-label");
    if (label)
      label.innerHTML = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        weekday: "long",
        day: "numeric",
      });

    //* Cutomize Event
    const eventTitle = document.querySelector(".rbc-event-content");
    const eventContent = document.querySelector(".rbc-event-label");

    if (eventTitle && eventContent) {
      eventTitle.style.display = "none";
      eventContent.innerHTML = eventContent.innerHTML.replace("–", "<br />");
    }
  }, [changed, date]);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-semibold text-black">Availability</h1>
      <div className="flex justify-end gap-4 mb-4">
        <div>
          <span className="inline-block w-3 h-3 mr-2 bg-green-600 rounded-full" />{" "}
          Available
        </div>
        <div>
          <span className="inline-block w-3 h-3 mr-2 bg-red-600 rounded-full" />{" "}
          Booked
        </div>
      </div>
      <Calendar
        events={displayedEvents}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: "500px",
          width: "100%",
        }}
        views={["week"]}
        defaultView="week"
        defaultDate={date}
        date={date}
        selectable={true}
        onSelectEvent={(event) => {
          if (event.status === 0) {
            setSelectedEvent(event);
            setShowPopup(true);
          }
        }}
        onNavigate={(date) => {
          setDate(date);
          setChanged(!changed);
        }}
        eventPropGetter={(event) => {
          return {
            style: {
              backgroundColor: event.status === 0 ? "green" : "red",
              cursor: event.status === 0 ? "pointer" : "not-allowed",
            },
          };
        }}
        scrollToTime={date}
        components={{
          event: ({ event }) => {
            return (
              <div
                className="rbc-event"
                onClick={() => {
                  setSelectedEvent(event);
                  setShowPopup(true);
                }}
              >
                <p>
                  {new Date(event.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>
                  {new Date(event.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            );
          },
        }}
      />

      {showPopup && (
        <BookPopup
          event={selectedEvent}
          onClose={() => {
            setShowPopup(false);
            setSelectedEvent(null);
          }}
          forceUpdate={forceUpdate}
          teacher={teacher}
        />
      )}
    </div>
  );
}

const BookPopup = ({ event, onClose, forceUpdate, teacher }) => {
  const [loading, setLoading] = useState(false);

  const ref = useRef();
  useClickOutside(ref, () => onClose()); // Custom hook to close the popup when the user clicks outside

  const token = JSON.parse(localStorage.getItem("user")).access_token;

  const bookSession = async () => {
    if (!token) {
      localStorage.setItem("redirect", window.location.pathname);
      window.location.href = "/login";
      return;
    }

    const fd = new FormData();
    fd.append("sessiontable_id", event?.id);

    setLoading(true);
    try {
      const res = await fetch(`https://yousab-tech.com/unihome/public/api/auth/session/store`, {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });
      if (res.ok) {
        forceUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Error booking session:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="popup ">
      <div ref={ref} className="popup-content">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-semibold text-black">
            Book "{event.title}" at:
          </h2>
          <p>Date: {new Date(event.start).toLocaleDateString()}</p>
          <p>Start Time: {new Date(event.start).toLocaleTimeString()}</p>
          <p>End Time: {new Date(event.end).toLocaleTimeString()}</p>
          <div className="mt-2">
            <h2 className="text-xl font-semibold text-black">With:</h2>
            <div className="mt-2">
              <img
                src={teacher.image}
                alt={teacher.name}
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-2 text-lg font-semibold text-black">
                {teacher.name}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 text-red-500 transition-all rounded-md ring-2 ring-red-500 hover:bg-red-500 hover:text-white"
            disabled={loading}
          >
            Close
          </button>
          <button
            className="px-5 py-2 text-white transition-all bg-green-600 rounded-md ring-2 ring-green-600 hover:bg-green-500 hover:ring-green-500"
            onClick={bookSession}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book"}
          </button>
        </div>
      </div>
    </div>
  );
};
