import React, { lazy, Suspense, useEffect, useState } from "react";
import Test from "./Test";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function SliderTeatcher() {
  const InstructorCard = lazy(() => import("./InstractorCard/InstructorCard"));
  const [dataApi, setDataApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  console.log(dataApi);
  
  const apiData = async () => {
    try {
      const res = await axios.get("https://yousab-tech.com/unihome/public/api/teachers");
      setDataApi(res.data.data.teachers);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiData();
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 1500,
    arrows: true,
    adaptiveHeight: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <h1 className="text-center text-6xl font-bold text-white mt-6 relative">
        <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t("Teachers")}</span>
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
      </h1>
      <div className="py-6 px-11">
        {loading ? (
          <div className="w-full flex justify-center items-center mx-auto my-10 gap-10">
            <Suspense fallback={<div>Loading...</div>}>
              <Test />
              <Test />
              <Test />
            </Suspense>
          </div>
        ) : (
          <Slider {...settings}>
            {dataApi?.map((e) => (
              <Link
                to={`/TeaCherS/${e.id}`}
                key={e.id}
                className="my-5 hover:scale-105 duration-500 transition-all"
              >
                <Suspense fallback={<div>Loading Card...</div>}>
                  <InstructorCard
                    img={e.image}
                    firstName={e.firstname}
                    lastName={e.lastname}
                    country={e.country}
                    about={e.intro}
                    students={e.students === null ? e.students = "0" : e.students}
                    Lessons={e.lessons || "0"}
                    Review={e.review === null ? e.review = "0" : e.review}
                    type={e.type}
                    className="bg-white rounded-lg shadow-md px-6 py-8 max-w-md mt-6 relative"
                  />
                </Suspense>
              </Link>
            ))}
          </Slider>

        )}
      </div>
    </>
  );
}
