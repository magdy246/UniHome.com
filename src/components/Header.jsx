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
        <div className="relative h-screen">
            {/* Background Image */}
            <img src={header} alt="Header Background" className="w-full h-full object-cover" />

            {/* Black Opacity Layer */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end py-10 md:py-20 gap-8 md:gap-14 text-white ps-6 md:ps-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 w-full md:w-1/2 font-[Cairo-B]">
                    {/* Render header title with strong tags for styling */}
                    <span className="font-extrabold">
                        {t('headerTitle').includes('يوني') ? 'مع ' : 'With '}
                    </span>
                    <strong className="text-blue-600 font-extrabold">
                        {t('headerTitle').includes('يوني') ? 'يوني' : 'Uni'}
                    </strong>
                    <strong className="text-orange-500 font-extrabold">
                        {t('headerTitle').includes('يوني') ? 'هوم...' : 'Home...'}
                    </strong>
                    <p>{t('subtitle')}</p>
                </h1>
                <p className="text-lg md:text-2xl w-full md:w-2/3 font-[Cairo-R]">
                    {t('description')}
                </p>
                <Link
                    to="/TeacherS"
                    className="font-[Cairo-B] text-xl w-fit border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-4 px-5 rounded-full focus:outline-none focus:shadow-outline"
                >
                    {t('buttonText')} <span className="ms-3">
                        <FontAwesomeIcon
                            className="fa-solid fa-poo-bolt fa-beat-fade"
                            style={{
                                "--fa-beat-fade-opacity": 0.5,
                                "--fa-beat-fade-scale": 1.25,
                            }}
                            icon={Lang === "en" ? faCircleArrowRight : faCircleArrowLeft}
                        />
                    </span>
                </Link>
            </div>
        </div>
    );
}
