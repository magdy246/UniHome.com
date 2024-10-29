import axios from "axios";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SupportIcon from "./components/SupportIcon";
import { Outlet, useLocation } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NetworkStatus from "./components/NetworkStatus/NetworkStatus";
import Alert from "./components/Alert";
import UpIcon from "./components/UpIcon";

export const apiWallet = createContext(null);

export default function App() {
  // **************** Disabled Inspect ****************
  useEffect(() => {
    const handleContextMenu = (event) => event.preventDefault();

    const handleKeyDown = (event) => {
      const key = event.key || event.keyCode;
      if (key === "F12" || key === 123) {
        event.preventDefault();
      } else if (
        (event.ctrlKey && event.shiftKey && (key === "I" || key === "J"))
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
  // **************** End Code ****************

  const { i18n, t } = useTranslation();
  const storedLanguage = JSON.parse(localStorage.getItem("lang")) || "en";
  const currentLanguage = i18n.language;
  const token = localStorage.getItem("accessToken");


  useEffect(() => {
    const direction = i18n.dir(currentLanguage);
    document.body.setAttribute("dir", direction);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    if (storedLanguage !== currentLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [storedLanguage, currentLanguage, i18n]);

  const [dataUse, setDataUse] = useState([]);
  const [refAPI, setRefAPI] = useState("");
  const [userTable, setUserTable] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State to control slow network alert
  const loc = useLocation();

  // Function to close alert
  const closeAlert = () => setShowAlert(false);

  // Axios instance with interceptors
  const axiosInstance = axios.create();

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: new Date() };
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to detect slow network
  axiosInstance.interceptors.response.use(
    (response) => {
      const endTime = new Date();
      const duration = endTime - response.config.metadata.startTime;
      if (duration > 15000) {
        setShowAlert(true);
      }
      return response;
    },
    (error) => {
      const endTime = new Date();
      const duration = endTime - error.config.metadata.startTime;
      if (duration > 15000) {
        setShowAlert(true);
      }
      return Promise.reject(error);
    }
  );

  // Fetch wallet data
  const fetchWalletData = async (token) => {
    try {
      const res = await axiosInstance.get("https://yousab-tech.com/unihome/public/api/auth/wallets", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setDataUse(res.data.data.wallets);
    } catch (error) {
      console.log("Error fetching wallet data:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get("https://yousab-tech.com/unihome/public/api/teachers");
      setUserTable(res.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  async function refreshToken() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `https://yousab-tech.com/unihome/public/api/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setRefAPI(response.data.access_token);

      // Fetch wallet data with the new token
      fetchWalletData(response.data.access_token);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }

  function startTokenRefresh() {
    const refreshInterval = 10000000;

    const tokenRefreshInterval = setInterval(() => {
      refreshToken();
    }, refreshInterval);

    return () => clearInterval(tokenRefreshInterval);
  }

  startTokenRefresh();

  // Fetch data when location or refAPI changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchWalletData(token);
    }
    fetchUserData();
  }, [token, loc.pathname, refAPI]);


  return (
    <apiWallet.Provider value={{ dataUse, setDataUse, userTable, setUserTable }}>
      <div>
        {localStorage.getItem("accessToken") ? (
          <NavBar showLink4={false} showLink1={true} />
        ) : (
          <NavBar showLink4={true} showLink1={false} />
        )}

        {showAlert && (
          <Alert
            message={t("Network is slow. Please be patient.")}
            onClose={closeAlert}
          />
        )}

        <main className="min-h-screen w-full pt-24 bg-[#eee]">
          <Outlet />
        </main>
        <SupportIcon />
        <UpIcon />
        <NetworkStatus />
        <Footer />
      </div>
    </apiWallet.Provider>
  );
}
