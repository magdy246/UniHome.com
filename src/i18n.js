import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./local/en/translation.json";
import translationAr from "./local/ar/translation.json";

// the translations
const resources = {
    en: {
        translation: translationEN,
    },
    ar: {
        translation: translationAr,
    },
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        language: "ar", // default language
        fallbackLanguage: "en", // fallback language if the current language is not available

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        detection: {
            order: ["localStorage"],
            caches: ["localStorage"],
        },
    });

export default i18n;