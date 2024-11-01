import React, { useState } from 'react';
import './instractorCard.css';
import { useTranslation } from 'react-i18next';
import { AiFillStar } from 'react-icons/ai';

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

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const { t } = useTranslation();
  return (
    <div className='p-6'>
      <div className="p-4 max-w-md mx-auto bg-gradient-to-r from-white to-gray-300 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
        {/* Avatar Section */}
        <div className="mx-auto w-28 h-28 overflow-hidden rounded-full shadow-lg border-4 border-gray-500">
          <img className="w-full h-full object-cover" src={img} alt="Avatar" />
        </div>

        {/* Name and Rating Section */}
        <div className="text-center mt-4">
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
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className='text-start'>
            <span className="block text-gray-500">{t('teacher')}: <span className="font-semibold text-gray-800">{country}</span></span>
            <span className="block text-gray-500">{t('From')}: <span className="font-semibold text-gray-800">{country}</span></span>
          </div>
          <div className='text-start md:text-center'>
            <span className="block text-gray-500">{t('Lessons')}: <span className="font-semibold text-gray-800">{Lessons}</span></span>
            <span className="block text-gray-500">{t('Students')}: <span className="font-semibold text-gray-800">{students}</span></span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-4">
          <p className={`line-clamp-1 text-gray-600`}>
            {about ? about : "Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
          </p>
          <button
            className="text-blue-600 pt-4 focus:outline-none hover:underline transition-colors duration-300"
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
