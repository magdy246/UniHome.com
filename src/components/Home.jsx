// Home.js
import About from "./About";
import { Helmet } from 'react-helmet';
import SliderTeatcher from "./SliderTeatcher";
import Header from "./Header";

// Lazy load the InstructorCard component

export default function Home() {
  return (
    <>
      <Helmet><title>Home</title>
        <meta name="description" content="احصل على أفضل الدروس الخصوصية عبر الإنترنت مع مدرسين محترفين. اختر من بين مجموعة متنوعة من الدورات التعليمية المباشرة وتعلم من المنزل بكل سهولة." /></Helmet>
      <div>
        <Header/>
        <About />
        <SliderTeatcher />
      </div>
    </>
  );
}
