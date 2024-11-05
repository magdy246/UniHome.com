import React, { useState } from 'react';
import './instractorCard.css';
import { useTranslation } from 'react-i18next';
import { AiFillStar } from 'react-icons/ai';
import countries from "../flag.json";
const CardComponent = ({
  img,
  firstName,
  lastName,
  country,
  Lessons,
  students,
  about,
  Review
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const getCountryFlag = (countryName) => {
    const country = countries.find((c) => c.country === countryName);
    return country ? country.flag : "";
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const { t } = useTranslation();
  return (
    <div className='p-6'>
      <div className="p-4 max-w-md mx-auto bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
        {/* Avatar Section */}
        <div className="mx-auto w-28 h-28 rounded-full shadow-lg border-4 border-gray-500 relative">
          <div className=' overflow-hidden rounded-full'>
            <img className="w-full h-full object-cover" src={img} alt="Avatar" />
          </div>
          <div><img
            className="country-flag z-20 absolute bottom-0 left-1/2 translate-x-1/2"
            src={getCountryFlag(country)}
            alt="flag"
          /></div>
        </div>

        {/* Name and Rating Section */}
        <div className="text-center mt-2">
          <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-1">
            Hi, I'm {firstName} {lastName}
          </h2>
          <div className="flex justify-center items-center mt-2">
            <div className="flex items-center text-yellow-400 text-lg mb-4">
              <AiFillStar className="mr-1" />
              <span className="font-semibold text-yellow-500">
                ({Review} {t("Reviews")})
              </span>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className='text-start'>
            <span className="block text-center md:text-start text-gray-500">{t('teacher')} <span className="font-semibold text-gray-800 line-clamp-1">English Langauge</span></span>
            <span className="block text-center md:text-start text-gray-500">{t('From')} <span className="font-semibold text-gray-800 line-clamp-1">{country}</span></span>
          </div>
          <div className='text-start md:text-center'>
            <span className="block text-center md:text-start text-gray-500">{t('Lessons')} <span className="font-semibold text-gray-800 line-clamp-1">{Lessons}</span></span>
            <span className="block text-center md:text-start text-gray-500">{t('Students')} <span className="font-semibold text-gray-800 line-clamp-1">{students}</span></span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-2">
          <p className={`line-clamp-1 text-gray-600`}>
            {about ? about : "Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
          </p>
          <button
            className="text-blue-600 pt-2 focus:outline-none hover:underline transition-colors duration-300"
            onClick={toggleReadMore}
          >
            {isExpanded ? t('Read Less') : t('Read More')}
          </button>
        </div>
      </div>
    </div>

  );
};

export default CardComponent;
