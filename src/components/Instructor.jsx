import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PiChatsCircle } from "react-icons/pi";
import axios from 'axios';

export const Instructor = () => {
  const [instructors, setInstructors] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://unih0me.com/api/teachers');
      setInstructors(response.data.data.teachers);
    } catch (error) {
      console.error(error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="instructor mb-16">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Slider */}
          <Slider {...settings} ref={sliderRef}>
            {instructors.map((instructor) => (
              <div
                className="instructor_card bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                key={instructor.id}
              >
                {/* Image */}
                <Link to={`/instructor/${instructor.id}`} className="flex-shrink-0">
                  <img loading="lazy"
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                </Link>

                {/* Instructor Details */}
                <div className="text-sm text-gray-700 mt-4 text-center">
                  <p>
                    Price: <span className="font-bold">{instructor.price ? `EG ${instructor.price}` : "Price not available"}</span>
                  </p>
                  <p>
                    Country: <span className="font-bold">{instructor.country}</span>
                  </p>
                </div>

                {/* Additional Information */}
                <div className="flex-1 mt-4 text-center">
                  <div className="flex items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{instructor.review} Reviews</p>
                  <div className="text-xs text-gray-700 mt-2">
                    <p>Teaches: <span className="font-bold">{instructor.course}</span></p>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {instructor.intro ? instructor.intro.split(' ').slice(0, 15).join(' ') : "No description available."}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center space-x-2 mt-4">
                    <Link to="#" className="btn bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-3 rounded text-xs flex items-center space-x-1">
                      <i className="fa-regular fa-calendar-days"></i>
                      <span className="text-xs">Availability</span>
                    </Link>
                    <Link to="#" className="btn bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-3 rounded text-xs flex items-center space-x-1">
                      <PiChatsCircle className="text-lg" />
                      <span className="text-xs">Message</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation Buttons */}
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaArrowLeft />
          </button>
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};
