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
            <div className="absolute inset-0 flex flex-col justify-end gap-4 md:gap-8 lg:gap-12 p-4 md:p-10 text-white">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 w-full lg:w-2/3 font-[Cairo-B] leading-tight">
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
                    </h1>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl w-full lg:w-1/2 font-[Cairo-B]">
                        {t('subtitle')}
                    </p>
                </div>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl w-full lg:w-2/3 font-[Cairo-R]">
                    {t('description')}
                </p>

                <Link
                    to="/TeacherS"
                    className="font-[Cairo-B] text-lg sm:text-xl md:text-2xl w-fit border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black duration-500 text-white font-bold py-3 px-4 md:py-4 md:px-5 rounded-full focus:outline-none focus:shadow-outline"
                >
                    {t('buttonText')}
                    <span className="ms-3">
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
