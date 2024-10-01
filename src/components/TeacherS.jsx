import React from "react";
import SliderTeatcher from "./SliderTeatcher";
import { Helmet } from "react-helmet";

export default function TeacherS() {
  return (
    <>
    <Helmet>
            <title>Meet Our Teachers - UniHome</title>
            <meta name="description" content="Get to know UniHome's professional English teachers. Our experienced and certified tutors are here to help you achieve your language learning goals." />
            <meta name="keywords" content="UniHome, English teachers, professional tutors, certified teachers, language learning, English courses, expert tutors, personalized learning" />
            <meta name="author" content="UniHome" />
            <meta property="og:title" content="Meet Our Teachers - UniHome" />
            <meta property="og:description" content="Learn English with UniHome's professional and certified teachers. Join now to meet your tutor and start your journey!" />
            <meta property="og:image" content="./Assets/Favicon/favicon.ico" />
            <meta property="og:url" content="https://unih0me.com/TeacherS" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ar_EG" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Meet Our Teachers - UniHome" />
            <meta name="twitter:description" content="Learn English with professional and certified teachers at UniHome. Sign up today!" />
            <meta name="twitter:image" content="./Assets/Favicon/favicon.ico" />
            <link rel="canonical" href="https://unih0me.com/TeacherS" />
        </Helmet>
    <div>
      <SliderTeatcher />
    </div>
    </>
  );
}
