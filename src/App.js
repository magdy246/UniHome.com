import axios from "axios";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SupportIcon from "./components/SupportIcon";
import { Outlet, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus";
import Alert from "./components/Alert"; // Import Alert component

export const apiWallet = createContext(null);

export default function App() {
  // ****************disabeled inspect****************
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      const key = event.key || event.keyCode;

      if (key === "F12" || key === 123) {
        event.preventDefault();
      } else if (
        (event.ctrlKey && event.shiftKey && key === "I") ||
        (event.ctrlKey && event.shiftKey && key === "J")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  // ****************End Code****************

  const { i18n } = useTranslation();
  const storedLanguage = JSON.parse(localStorage.getItem("lang")) || "en";
  const currentLanguage = i18n.language;

  useEffect(() => {
    const direction = i18n.dir(currentLanguage);
    document.body.setAttribute("dir", direction);
    console.log("currentLanguage: ", currentLanguage);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    if (storedLanguage !== currentLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [storedLanguage, currentLanguage, i18n]);

  const [dataUse, setDataUse] = useState([]);
  const [refAPI, setRefAPI] = useState([]);
  const [userTable, setUserTable] = useState();
  const loc = useLocation();

  const [showAlert, setShowAlert] = useState(false); // State to control slow network alert

  // Function to close alert
  const closeAlert = () => setShowAlert(false);

  // Axios interceptors to detect slow network requests
  useEffect(() => {
    const axiosInstance = axios.create();

    // Request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        config.metadata = { startTime: new Date() };
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to check response time
    axiosInstance.interceptors.response.use(
      (response) => {
        const endTime = new Date();
        const duration = endTime - response.config.metadata.startTime;
        if (duration > 4000) { // 3 seconds threshold
          setShowAlert(true);
        }
        return response;
      },
      (error) => {
        const endTime = new Date();
        const duration = endTime - error.config.metadata.startTime;
        if (duration > 3000) {
          setShowAlert(true);
        }
        return Promise.reject(error);
      }
    );

    // Example API call for teachers
    const usersData = async () => {
      try {
        const userTable = await axiosInstance.get("https://yousab-tech.com/unihome/public/api/teachers");
        setUserTable(userTable);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    usersData();
  }, []);

  const token = localStorage.getItem("accessToken");

  // Token refresh logic
  useEffect(() => {
    const interval = setInterval(() => {
      const refreshToken = async () => {
        if (token) {
          try {
            const res = await axios.post(
              "https://yousab-tech.com/unihome/public/api/auth/refresh",
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            localStorage.setItem("accessToken", res.data.access_token);
            setRefAPI(res.data.access_token);
          } catch (error) {
            console.log("Error refreshing token:", error);
          }
        }
      };

      refreshToken();
    }, 660000); // Refresh token every 11 minutes

    return () => clearInterval(interval); // Clear interval on unmount
  }, [token]);

  // Fetch wallet data
  useEffect(() => {
    const getWalletData = async () => {
      try {
        const res = await axios.get("https://yousab-tech.com/unihome/public/api/auth/wallets", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setDataUse(res.data.data.wallets);
      } catch (error) {
        console.log("Error fetching wallet data:", error);
      }
    };

    getWalletData();
  }, [loc.pathname, refAPI, token]);

  return (
    <apiWallet.Provider value={{ dataUse, setDataUse, userTable, setUserTable }}>
      <div>
        {token ? (
          <div className="m-auto">
            <NavBar showLink4={false} showLink1={true} />
          </div>
        ) : (
          <div className="m-auto">
            <NavBar showLink4={true} showLink1={false} />
          </div>
        )}

        {showAlert && (
          <Alert
            message="Network is slow. Please be patient."
            onClose={closeAlert}
          />
        )}

        <main className="min-h-screen w-full pt-24 bg-[#eee]">
        <Outlet />
        </main>
        <SupportIcon />
        <NetworkStatus />
        <Footer />
      </div>
    </apiWallet.Provider>
  );
}
