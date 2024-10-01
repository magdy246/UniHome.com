// Home.js
import About from "./About";
import { Helmet } from 'react-helmet';
import SliderTeatcher from "./SliderTeatcher";
import Header from "./Header";

// Lazy load the InstructorCard component

export default function Home() {
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
