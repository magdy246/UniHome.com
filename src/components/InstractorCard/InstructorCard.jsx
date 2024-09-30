import React, { useState } from 'react';
import './instractorCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const CardComponent = ({
  img,
  firstName,
  lastName,
  type,
  country,
  lessons,
  students,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const { t } = useTranslation();
  return (
    <div className='p-6'>
      <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-lg">
        {/* Avatar Section */}
        <div className="mx-auto w-28 h-28 overflow-hidden rounded-3xl">
          <img className="w-full h-full object-cover" src={img} alt="Avatar" />
        </div>

        {/* Name and Rating Section */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-gray-800">
            {firstName} {lastName}
          </h2>
          <div className="flex justify-center items-center mt-2">
            {/* Display rating */}
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                className="text-yellow-300"
                icon={faStar}
              />
            ))}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className='text-start'>
            <span className="block text-gray-500">{type}: {country}</span>
            <span className="block text-gray-500">{t('From')}: {country}</span>
          </div>
          <div className='text-start md:text-center'>
            <span className="block text-gray-500">{t('Lessons')}: {lessons}</span>
            <span className="block text-gray-500">{t('Students')}: {students}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-4">
          <p className={`${isExpanded ? '' : 'line-clamp-3'} text-gray-600`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit error totam, assumenda, soluta beatae, aperiam facere voluptatem qui reiciendis nulla laudantium quia sint sapiente eos officia exercitationem impedit optio illo?
          </p>
          <button
            className="text-blue-600 pt-4 focus:outline-none hover:underline"
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
