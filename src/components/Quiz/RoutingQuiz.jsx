import React, { useEffect, useState } from "react";
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import SubmitAnswer from "./SubmitAnswer";
import ResultQuestionForStudent from "./ResultQuestionForStudent";
import { Helmet } from 'react-helmet';
import { t } from "i18next";
export default function RoutingQuiz({ Session, Student }) {

    const [colorsActive, setColorsActive] = useState({
        tab1: "tab1",
        tab2: "tab1",
        tab3: "tab1",
        tab4: "tab1",
        tab5: "tab1",
        tab6: "tab1",
        tab7: "tab1",
        tab8: "tab1",
    });

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


    const handleColorsClick = (value) => {
        if (value === colorsActive) {
            return;
        }
        setColorsActive({ ...colorsActive, ...value });
    };

    const tabButtonStyles = "tabsOfRoute";

    return (<>
        <Helmet>
            <title>Dashboard - UniHome</title>
            <meta name="description" content="Welcome to your UniHome Dashboard. Manage your courses, track your progress, and access personalized learning resources." />
            <meta name="keywords" content="UniHome, dashboard, course management, progress tracking, online learning, personalized resources, English courses" />
            <meta name="author" content="UniHome" />
            <meta property="og:title" content="Dashboard - UniHome" />
            <meta property="og:description" content="Manage your learning journey with the UniHome Dashboard. Access courses, track your progress, and connect with your tutors." />
            <meta property="og:image" content="./src/components/Assets/images/UniHome.png" />
            <meta property="og:url" content="https://unih0me.com/dashboard" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ar_EG" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Dashboard - UniHome" />
            <meta name="twitter:description" content="Your UniHome Dashboard is here! Manage your courses and track your progress easily." />
            <meta name="twitter:image" content="./src/components/Assets/images/UniHome.png" />
            <link rel="canonical" href="https://unih0me.com/dashboard" />
        </Helmet>
        <div className="mb-3">
        <h1 className="text-center text-6xl font-bold text-white my-6 relative">
        <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t("Quizzes")}</span>
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
      </h1>
            {/* Centered Tabs */}
            <div className="flex justify-center" dir={Lang === "ar" ? "rtl" : "ltr"}>
                <TETabs>
                    <TETabsItem
                        onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab1" })}
                        active={colorsActive.tab8 === "tab1"}
                        className={`${tabButtonStyles} ${colorsActive.tab8 === "tab1" ? "ActivetabsOfRoute" : ""
                            }`}
                    >
                        {t("Questions")}
                    </TETabsItem>
                    <TETabsItem
                        onClick={() => handleColorsClick({ ...colorsActive, tab8: "tab2" })}
                        active={colorsActive.tab8 === "tab2"}
                        className={`${tabButtonStyles} ${colorsActive.tab8 === "tab2" ? "ActivetabsOfRoute" : ""
                            }`}
                    >
                        {t("Results")}
                    </TETabsItem>
                </TETabs>
            </div>

            {/* Tab Content */}
            <div className="mt-5">
                <TETabsContent>
                    <TETabsPane show={colorsActive.tab8 === "tab1"}>
                        <SubmitAnswer />
                    </TETabsPane>
                    <TETabsPane show={colorsActive.tab8 === "tab2"}>
                        <ResultQuestionForStudent />
                    </TETabsPane>

                </TETabsContent>
            </div>
        </div>
    </>
    );
}
