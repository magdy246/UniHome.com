import { useEffect, useState, useRef } from "react";
import {
  TETabs,
  TETabsContent,
  TETabsItem,
  TETabsPane,
} from "tw-elements-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdGetApp, MdQuiz } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { PiMonitorPlayFill } from "react-icons/pi";
import { Helmet } from 'react-helmet';
import ResultQuestionForTeacher from "./Quiz/ResultQuestionForTeacher";
import { GiWallet } from "react-icons/gi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Cookies from "js-cookie";
import RoutingSession from "./Sessions/RoutingSession";
import DesignWallet from "./Wallet/DesignWallet";
import TeacherCard from "./Instructor/TeacherCard";
import RoutingQuiz from "./Quiz/RoutingQuiz";
import { t } from 'i18next';
import ApplicationTeacher from "./ApplicationTeacher";
import RoutingSting from "./Profile/RoutingSting";
export default function Dashboard() {
  const [basicActive, setBasicActive] = useState("tab1");
  const [applicationTeacher, setApplicationTeacher] = useState(false);
  const [addQuestion, setAddQuestion] = useState(false);
  const [dataSession, setDataSession] = useState([]);
  const [student, setStudent] = useState([]);
  const [submitAnswer, setSubmitAnswer] = useState(false);
  const [routingQuiz, setRoutingQuiz] = useState(false);
  const [resultQuestionForStudent, setResultQuestionForStudent] = useState(false);
  const [resultQuestionForTeacher, setResultQuestionForTeacher] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState("md:pt-28 pt-24");
  const sidebarRef = useRef(null);
  let dataUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 80) {
        setSidebarHeight("pt-24");
      } else {
        setSidebarHeight("md:pt-0 pt-0");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dataUser.type === "student") {
      setRoutingQuiz(true);
      setSubmitAnswer(true);
      setResultQuestionForStudent(true);
    } else {
      setResultQuestionForTeacher(true);
      setAddQuestion(true);
      setApplicationTeacher(true);
    }
  }, [dataUser.type]);

  const handleBasicClick = (value) => {
    setBasicActive(value);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
        setDataSession(response?.data?.data?.sessions);
      } catch (error) {
      }
    };
    sessions();
  }, []);
  useEffect(() => {
    dataSession.map(async (e) => {
      const userId = dataUser.type === "student" ? e.teacher_id.id : e.student_id;
      let request = await axios.get(
        `https://yousab-tech.com/unihome/public/api/teacher/${userId}`,
        {
          headers: {
            "Content-Type": "application",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudent(request.data.data.user);
    });
  }, []);
  useEffect(() => {
  }, [student]);

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
      <div className="flex flex-col min-h-screen bg-[#eee] py-6" dir="ltr">
        <button
          onClick={toggleSidebar}
          className={`inline-flex gap-5 w-fit items-center ms-4 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transform transition-transform ${sidebarOpen ? 'translate-x-56' : ''}`}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-10 h-10 bg-orange-500 p-1 rounded-xl text-white"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
          {!sidebarOpen && (
            <p className="text-xl text-blue-600 font-bold me-2">
              <span className="me-3">
                <FontAwesomeIcon
                  className="fa-solid fa-poo-bolt fa-beat-fade"
                  style={{
                    "--fa-beat-fade-opacity": 0.5,
                    "--fa-beat-fade-scale": 1.25,
                  }}
                  icon={faCircleArrowLeft}
                />
              </span>
              {t("Dashboard")}
            </p>
          )}
        </button>

        <aside
          ref={sidebarRef}
          id="default-sidebar"
          className={`fixed top-24 left-0 z-40 w-56 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}  // Removed dynamic pt-* and fixed top-24
          aria-label="Sidebar"
        >
          <div className="h-full py-3 bg-gray-50 dark:bg-gray-800 rounded-e-3xl">
            <TETabs className="flex flex-col justify-start font-medium gap-4">
              <TETabsItem
                onClick={() => handleBasicClick("tab1")}
                className="bg-gray-200 flex justify-start items-center mx-auto rounded-3xl gap-1 w-5/6"
                active={basicActive === "tab1"}
              >
                <PiMonitorPlayFill className="text-2xl inline text-orange-500" />
                <span className="mt-1 text-base font-semibold">{t("Sessions")}</span>
              </TETabsItem>

              <TETabsItem
                onClick={() => handleBasicClick("tab2")}
                className="bg-gray-200 flex justify-start items-center mx-auto rounded-3xl gap-1 w-5/6"
                active={basicActive === "tab2"}
              >
                <FaChalkboardTeacher className="text-2xl inline text-orange-500" />
                <span className="mt-1 text-base font-semibold">
                  {t("Teachers")}
                </span>
              </TETabsItem>

              <TETabsItem
                onClick={() => handleBasicClick("tab6")}
                className="bg-gray-200 flex justify-start items-center mx-auto rounded-3xl gap-1 w-5/6"
                active={basicActive === "tab6"}
              >
                <MdQuiz className="text-2xl inline text-orange-500" />
                <span className="mt-1 text-base font-semibold">{t("Quizzes")}</span>
              </TETabsItem>

              <TETabsItem
                onClick={() => handleBasicClick("tab4")}
                className="bg-gray-200 flex justify-start items-center mx-auto rounded-3xl gap-1 w-5/6"
                active={basicActive === "tab4"}
              >
                <GiWallet className="text-2xl inline text-orange-500" />
                <span className="mt-1 text-base font-semibold">{t("Wallet")}</span>
              </TETabsItem>

              <TETabsItem
                onClick={() => handleBasicClick("tab5")}
                className="bg-gray-200 flex justify-start items-center mx-auto rounded-3xl gap-1 w-5/6"
                active={basicActive === "tab5"}
              >
                <IoSettingsSharp className="text-2xl inline text-orange-500" />
                <span className="mt-1 text-base font-semibold">{t("Settings")}</span>
              </TETabsItem>

              {applicationTeacher &&
                <TETabsItem
                  onClick={() => handleBasicClick("tab3")}
                  className="bg-gray-200 flex justify-start items-center mx-auto rounded-3xl gap-1 w-5/6"
                  active={basicActive === "tab3"}
                >
                  <MdGetApp className="text-2xl inline text-orange-500" />
                  <span className="mt-1 text-base font-semibold">{t("Application")}</span>
                </TETabsItem>
              }
            </TETabs>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full p-5">
          <TETabsContent>
            <TETabsPane show={basicActive === "tab1"}>
              <RoutingSession Student={student} Session={dataSession} />
            </TETabsPane>

            <TETabsPane show={basicActive === "tab2"}>
              {dataSession.map((e, index) => (
                <TeacherCard key={index} Student={student} Session={e} />
              ))}
            </TETabsPane>

            <TETabsPane show={basicActive === "tab4"}>
              <DesignWallet />
            </TETabsPane>

            <TETabsPane show={basicActive === "tab5"}>
              <RoutingSting />
            </TETabsPane>

            <TETabsPane show={basicActive === "tab3"}>
              {applicationTeacher && <ApplicationTeacher />}
              {/* <ApplicationTeacher /> */}
            </TETabsPane>

            <TETabsPane show={basicActive === "tab6"}>
              {routingQuiz && <RoutingQuiz />}
              {resultQuestionForTeacher && <ResultQuestionForTeacher />}
            </TETabsPane>
          </TETabsContent>
        </div>
      </div>
    </>
  );
}
