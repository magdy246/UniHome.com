import React, { lazy, Suspense, useEffect, useState } from "react";
import Test from "./Test";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";


export default function SliderTeatcher() {
  const InstructorCard = lazy(() => import("./InstractorCard/InstructorCard"));
  const [dataApi, setDataApi] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <h1 className="text-center text-6xl font-bold text-gray-800 mt-3">Teachers</h1>
      <div className="py-6 px-11">
        {loading ? (
          <div className="w-full flex justify-center items-center mx-auto my-10">
            <Suspense fallback={<div>Loading...</div>}>
              <Test />
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
                    students={e.students?.length}
                    Lessons={e.sessions?.length}
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
