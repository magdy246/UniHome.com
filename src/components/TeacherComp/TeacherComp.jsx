import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import countries from "../flag.json";
import "./TeacherComp.css";
import Test2 from './Test2';

export default function TeacherComp() {
    const getCountryFlag = (countryName) => {
        const country = countries.find((c) => c.country === countryName);
        return country ? country.flag : "";
    };
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

    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{`${dataApi?.[0]?.firstname || 'Teacher'} - English Teacher at UniHome`}</title>
                <meta name="description" content={`Learn English with ${dataApi?.[0]?.firstname || 'a professional teacher'}`} />
                <meta property="og:image" content={dataApi?.[0]?.image} />
            </Helmet>

            <h1 className="text-center text-6xl font-bold text-white mt-6 relative">
                <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t('Teachers')}</span>
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
            </h1>

            <div className="py-6 px-1 md:px-11" dir='ltr'>
                {loading ? (
                    <div className="w-3/4 flex justify-center items-center mx-auto my-10 gap-10">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Test2 />
                        </Suspense>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {dataApi.map((teacher) => (
                            <Link to={`/TeacherCards/${teacher.id}`} key={teacher.id} className="teacher-link">
                                <Suspense fallback={<div>Loading Card...</div>}>
                                    <div className="teacher-card-container">
                                        {/* Avatar Section */}
                                        <div className="teacher-avatar">
                                            <div className="teacher-avatar-img-wrapper">
                                                <img
                                                    className="teacher-avatar-img"
                                                    src={teacher.image || "https://yousab-tech.com/unihome/public/default.jpg"}
                                                    alt="Teacher"
                                                />
                                            </div>
                                        </div>

                                        {/* Information Section */}
                                        <div className="teacher-info">
                                            {/* Name and Rating */}
                                            <div className="text-left">
                                                <h2 className="teacher-name">
                                                    Hi, I'm {teacher.firstname} {teacher.lastname}
                                                </h2>
                                                <p className="teacher-intro">
                                                    {teacher.intro || "Learn with a professional English teacher!"}
                                                </p>
                                            </div>

                                            {/* Stats (Country, Lessons, Students) */}
                                            <div className="teacher-stats">
                                                <div className="teacher-stat-item">
                                                    <span className="teacher-stat-label">{t('country')}</span>
                                                    <strong className="teacher-country">
                                                        {t(teacher.country)}
                                                        <span>
                                                            <img
                                                                className="country-flag"
                                                                src={getCountryFlag(teacher.country)}
                                                                alt="flag"
                                                            />
                                                        </span>
                                                    </strong>
                                                </div>
                                                <div className="teacher-stat-item">
                                                    <span className="teacher-stat-label">{t('Lessons')}</span>
                                                    <strong className="teacher-stat-value">
                                                        {teacher.lessons || "0"}
                                                    </strong>
                                                </div>
                                                <div className="teacher-stat-item">
                                                    <span className="teacher-stat-label">{t('Students')}</span>
                                                    <strong className="teacher-stat-value">{teacher.students || "0"}</strong>
                                                </div>
                                            </div>

                                            {/* Rating Section */}
                                            <div className="teacher-rating">
                                                <AiFillStar className="star-icon" />
                                                <span className="teacher-review">
                                                    ({teacher.review == null ? "0" : teacher.review} {t('Reviews')})
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Suspense>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
