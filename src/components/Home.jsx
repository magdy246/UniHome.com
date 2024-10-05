// Home.js
import About from "./About";
import { Helmet } from 'react-helmet';
import SliderTeatcher from "./SliderTeatcher";
import Header from "./Header";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// Lazy load the InstructorCard component

export default function Home() {
  const navigate = useNavigate();

  // Function to get user data and set cookie
  async function userData(token) {
    try {
      const res = await axios.get("https://yousab-tech.com/unihome/public/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Save user data in cookies
      Cookies.set("user", JSON.stringify(res.data.user), { expires: 7 });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // This will run once after redirection from Google
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token"); // Get the token from URL params

    if (token) {
      // Set the access token in cookies
      Cookies.set("accessToken", token, { expires: 7 });

      // Fetch user data and then redirect
      userData(token).then(() => {
        navigate("/"); // Redirect user to home page
      });
    } else {
      console.warn("No access token found in URL parameters.");
    }
  }, []); // Empty dependency array to ensure it runs only once on component mount

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
