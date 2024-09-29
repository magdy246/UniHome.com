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
    <div className="card-container">
      <div className="avatar-container">
        <img src={img} alt="Avatar" />
      </div>

      <h2 className="name-rating">
        <span className="name">
          {firstName} {lastName}
        </span>
        <div className="rating">
          <FontAwesomeIcon className='rating-color' icon={faStar} />
          <FontAwesomeIcon className='rating-color' icon={faStar} />
          <FontAwesomeIcon className='rating-color' icon={faStar} />
          <FontAwesomeIcon className='rating-color' icon={faStar} />
          <FontAwesomeIcon className='rating-color' icon={faStar} />
        </div>
      </h2>

      <div className="info-section">
        <div className="info-column">
          <span className="info-badge">
            {type}: {country}
          </span>
          <span className="info-badge">{t('From')}: {country}</span>
        </div>
        <div className="info-column">
          <span className="info-badge">{t('Lessons')}: {lessons}</span>
          <span className="info-badge">{t('Students')}: {students}</span>
        </div>
      </div>

      <div className="description">
        <p className={isExpanded ? '' : 'line-clamp'}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit error totam, assumenda, soluta beatae, aperiam facere voluptatem qui reiciendis nulla laudantium quia sint sapiente eos officia exercitationem impedit optio illo?
        </p>
        <button className="text-blue-600 mt-2" onClick={toggleReadMore}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>


    </div>
  );
};

export default CardComponent;
