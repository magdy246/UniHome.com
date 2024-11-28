// Home.js
import About from "./About";
import { Helmet } from 'react-helmet';
import SliderTeatcher from "./SliderTeatcher";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Lazy load the InstructorCard component

export default function Home() {
  let navigate = useNavigate();
  const [refAPI, setRefAPI] = useState("");

  async function userData() {
    try {
      const token = localStorage.getItem("accessToken");
      let res = await axios.get("https://yousab-tech.com/unihome/public/api/auth/profile", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
      )
      localStorage.setItem("user", JSON.stringify(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }

  // Function to refresh token
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

      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setRefAPI(response.data.access_token);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const token = urlParams.get("token");

    if (accessToken || token) {
      localStorage.setItem("accessToken", accessToken || token);
      userData();
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>UniHome - Learn English Differently</title>
        <meta name="description" content="Start learning English with UniHome in a fun and personalized way. Flexible scheduling, professional tutors, and tailored courses just for you." />
        <meta name="keywords" content="UniHome, learn English, English courses, personalized learning, online courses, professional tutors, flexible scheduling, English conversation, language learning" />
        <meta name="author" content="UniHome" />
        <meta property="og:title" content="UniHome - Learn English Differently" />
        <meta property="og:description" content="Join UniHome and learn English in a fun, personalized way. Book your lessons with professional tutors now!" />
        <meta property="og:image" content="./Assets/Favicon/favicon.ico" />
        <meta property="og:url" content="https://unih0me.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UniHome - Learn English Differently" />
        <meta name="twitter:description" content="Learn English in a fun and personalized way with UniHome. Sign up now!" />
        <meta name="twitter:image" content="./Assets/Favicon/favicon.ico" />
        <link rel="canonical" href="https://unih0me.com" />
      </Helmet>

      <div>
        <Header />
        <About />
        <SliderTeatcher />
      </div>
    </>
  );
}
