import { Link } from "react-router-dom";
import header from "./Assets/images/student-header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";

export default function Header() {
    const { t } = useTranslation();

    const savedLang = localStorage.getItem("lang") || 'en';
    const [Lang, setLang] = useState(savedLang);

    useEffect(() => {
        try {
            const parsedLang = JSON.parse(savedLang);
            setLang(parsedLang);
        } catch (error) {
            console.error('Failed to parse language from localStorage', error);
        }
    }, [savedLang]);

    return (
        <div className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: `url(${header})` }}>
            {/* Black Opacity Layer */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Decorative Circle Overlays */}
            <div className="absolute w-32 h-32 sm:w-48 sm:h-48 bg-orange-500 rounded-full top-1/4 left-[10%] sm:left-1/4 opacity-20 animate-pulse"></div>
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-blue-500 rounded-full bottom-1/3 sm:bottom-1/4 right-[10%] sm:right-1/3 opacity-20 animate-bounce"></div>

            {/* Text Overlay */}
            <div className="relative z-10 p-4 sm:p-6 md:p-10 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 lg:mb-6 font-[Cairo-B]">
                    <span className="block">
                        {t('headerTitle').includes('يوني') ? 'مع ' : 'With '}
                        <strong className="text-blue-600">{t('headerTitle').includes('يوني') ? 'يوني' : 'Uni'}</strong>
                        <strong className="text-orange-500">{t('headerTitle').includes('يوني') ? 'هوم...' : 'Home...'}</strong>
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-[Cairo-B] mb-4 lg:mb-6">
                    {t('subtitle')}
                </p>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 font-[Cairo-R] mb-6 lg:mb-10">
                    {t('description')}
                </p>

                <Link
                    to="/TeacherCards"
                    className="inline-block px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white bg-gradient-to-r from-blue-500 to-orange-500 hover:from-orange-500 hover:to-blue-500 rounded-full font-[Cairo-B] shadow-lg transform hover:scale-105 transition-all duration-500"
                >
                    {t('buttonText')}
                    <span className="ltr:ml-3 ltr:sm:ml-4 rtl:mr-3 rtl:sm:mr-4">
                        <FontAwesomeIcon
                            icon={Lang === "en" ? faCircleArrowRight : faCircleArrowLeft}
                            className="fa-solid fa-bounce"
                        />
                    </span>
                </Link>
            </div>
        </div>

    );
}
