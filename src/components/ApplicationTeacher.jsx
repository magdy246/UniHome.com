import React, { useEffect, useState } from 'react'
import imgApplication from './Assets/Teacher-application.jpg'
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import moment from 'moment-timezone';
import Cookies from 'js-cookie';
import { useTranslation } from "react-i18next";

export default function ApplicationTeacher() {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [applicationInput, setApplicationInput] = useState({
        youtube_link: "",
        nationalid: "",
        cv: "",
        image: "",
        language_id: "",
        proficiency_id: "",
        intro: "",
        course_id: ""
    });

    async function applicationTeacher() {
        try {
            const token = localStorage.getItem("accessToken");
            let response = await axios.post("https://yousab-tech.com/unihome/public/api/auth/user-profile/teacher", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            console.log(response);
            setLoading(false);
        } catch (err) {
            // Check if the error has a response object and use the message from it
            setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message);
            setLoading(false);
        }
    }

    function input(e) {
        let applicationUser = { ...applicationInput };
        applicationUser[e.target.name] = e.target.value;
        setApplicationInput(applicationUser);
        console.log(applicationInput);
    }

    function submitApplication(e) {
        e.preventDefault();
        setLoading(true)
        applicationTeacher()
    }
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

    return <>
        <Helmet>
            <title>Teacher Application</title>
        </Helmet>
        <h1 className="text-center text-6xl font-bold text-white mb-6 relative" dir="ltr">
            <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">Teacher Application</span>
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
        </h1>
        <section className="h-full flex flex-wrap justify-center items-center my-10">
            {/* Form Section */}
            <div className="xl:basis-3/5 lg:basis-3/5 md:basis-full sm:basis-full basis-full p-6">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden w-full p-10">

                    {/* Image Section */}
                    <div className="xl:basis-2/5 lg:basis-2/5 md:basis-3/5 sm:basis-7/12 basis-full mb-8 md:mb-4 flex justify-center items-center">
                        <img src={imgApplication} alt={t('applicationImage')} className="w-1/2 sm:rounded-3xl rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" />
                    </div>

                    <p className="text-3xl font-bold text-gray-700 text-center pb-8">{t('teacherApplication')}</p>

                    {/* Resume Upload */}
                    <div className='flex justify-center items-center mb-8'>
                        <span className='text-orange-500 text-xl font-semibold mr-3'>{t('resume')}</span>
                        <button className="btn border-2 border-orange-500 text-white bg-orange-500 hover:bg-white hover:text-orange-500 hover:scale-105 duration-300 rounded-full px-5 py-2" onClick={() => document.getElementById('my_modal_3').showModal()}>
                            {t('pressHere')}
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={submitApplication} className="space-y-6">
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl" role="alert">
                                <strong className="font-bold">{error}</strong>
                            </div>
                        )}

                        {/* Modal for Resume Upload */}
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box p-10 h-5/6 rounded-2xl">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div className="space-y-6">

                                    {/* CV Upload */}
                                    <div>
                                        <label className="text-lg font-bold text-orange-500">{t('uploadCV')}</label>
                                        <input type="file" name="cv" onChange={input} className="file-input file-input-primary w-full" />
                                    </div>

                                    {/* National ID Upload */}
                                    <div>
                                        <label className="text-lg font-bold text-orange-500">{t('uploadID')}</label>
                                        <input type="file" name="nationalid" onChange={input} className="file-input file-input-primary w-full" />
                                    </div>

                                    {/* Profile Picture Upload */}
                                    <div>
                                        <label className="text-lg font-bold text-orange-500">{t('uploadProfilePicture')}</label>
                                        <input type="file" name="image" onChange={input} className="file-input file-input-primary w-full" />
                                    </div>
                                </div>
                            </div>
                        </dialog>

                        {/* Video YouTube Link */}
                        <div>
                            <label className="block text-base font-bold text-orange-500">{t('youtubeLink')}</label>
                            <input type="text" name="youtube_link" onChange={input} className="w-full p-3 rounded-2xl border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>

                        {/* Biography */}
                        <div>
                            <label className="block text-base font-bold text-orange-500">{t('biography')}</label>
                            <textarea name="intro" onChange={input} className="w-full p-4 rounded-2xl border-gray-300 bg-gray-50 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder={t('biographyPlaceholder')}></textarea>
                        </div>

                        {/* Language Teaching */}
                        <div className="space-y-4">
                            <label className="block text-base font-bold text-orange-500">{t('languageTeach')}</label>
                            <select dir={Lang === "ar" ? "rtl" : "ltr"} name="course_id" onChange={input} className="w-full p-3 rounded-2xl bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <option hidden>{t('select')}</option>
                                <option value="0">{t('english')}</option>
                                <option value="1">{t('german')}</option>
                                <option value="2">{t('french')}</option>
                                <option value="3">{t('arabic')}</option>
                            </select>
                        </div>

                        {/* Languages You Speak */}
                        <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
                            <div className="w-full md:w-1/2">
                                <label className="block text-base font-bold text-orange-500">{t('languagesSpeak')}</label>
                                <select dir={Lang === "ar" ? "rtl" : "ltr"} name="language_id" onChange={input} className="w-full p-3 rounded-2xl bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                    <option hidden>{t('select')}</option>
                                    <option value="English">{t('english')}</option>
                                    <option value="Arabic">{t('arabic')}</option>
                                </select>
                            </div>
                        </div>
                        {/* Proficiency */}
                        <div className="w-full md:w-1/2">
                            <label className="block text-base font-bold text-orange-500">{t('proficiency')}</label>
                            <select dir={Lang === "ar" ? "rtl" : "ltr"} name="proficiency_id" onChange={input} className="w-full p-3 rounded-2xl bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <option hidden>{t('select')}</option>
                                <option value="Beginner">{t('beginner')}</option>
                                <option value="Intermediate">{t('intermediate')}</option>
                                <option value="Advanced">{t('advanced')}</option>
                                <option value="Native">{t('native')}</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10 text-center">
                            <button type="submit" className="text-white orange duration-300 transition-all px-6 py-3 rounded-full font-bold text-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                                {loading ? <span className="loading loading-infinity loading-lg h-4"></span> : t('submitApplication')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    </>
}