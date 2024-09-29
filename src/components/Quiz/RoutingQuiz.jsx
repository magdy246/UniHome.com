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
            <title>Quizzes</title>
            <meta name="description" content="استعد لاختباراتك من خلال مجموعة متنوعة من الاختبارات عبر الإنترنت. قم بتقييم مهاراتك وتحسين أدائك الأكاديمي بشكل تفاعلي وممتع." />
        </Helmet>
        <div className="mb-3">
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
