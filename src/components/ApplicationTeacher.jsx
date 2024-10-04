import React, { useState } from 'react'
import imgApplication from './Assets/Teacher-application.jpg'
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import moment from 'moment-timezone';
import Cookies from 'js-cookie';

export default function ApplicationTeacher() {

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
            const token = Cookies.get("accessToken");
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


    return <>
        <Helmet>
            <title>Teacher Application</title>
        </Helmet>
        <section className="h-full applicationTeacher flex flex-wrap justify-around items-start my-10">
            <div className="uniHomeImg xl:basis-2/5 md:basis-3/5 basis-7/12">
                <img src={imgApplication} alt="img Login" className='w-4/5 m-auto rounded-2xl' />
            </div>
            <div class="formLogin xl:basis-3/5 lg:basis-2/5 basis-full">
                <div className=" flex bg-white rounded-lg shadow-lg border overflow-hidden w-full">
                    <div className="w-full p-8 ">
                        <p className="text-2xl font-bold pb-5 text-gray-600 text-center">Teacher Application</p>
                        <div className='flex justify-center items-center'>
                            <span className='text-orange-400 text-xl font-bold me-3'>Resume<span></span></span>
                            <button className="btn text-white border-2 border-orange-600 hover:border-orange-500 bg-orange-500 hover:bg-orange-200 hover:text-black duration-500 rounded-3xl" onClick={() => document.getElementById('my_modal_3').showModal()}>Press here</button>
                        </div>
                        <form onSubmit={submitApplication} className='flex flex-wrap '>
                            {error && (
                                <div className="bg-red-100 border w-full mt-5 mb-10 border-red-400 text-red-700 px-4 py-3 rounded-2xl relative" role="alert">
                                    <strong className="font-bold">{error}</strong>
                                </div>
                            )}

                            <div class="w-full flex flex-wrap justify-center gap-7 items-baseline mt-5 px-3 mb-6 md:mb-0">
                                <div className="modelResume">
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box  h-5/6">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <div className="flex flex-col justify-between w-full h-full ">
                                                <div className="mt-4 ">
                                                    <label className="block mb-2 text-orange-500 text-lg font-bold">
                                                        Send your CV
                                                    </label>
                                                    {/* <span className='text-sm mb-4 text-red-600'>Send your CV *</span> */}
                                                    <input
                                                        name='cv'
                                                        onChange={input}
                                                        type="file"
                                                        className="file-input file-input-bordered file-input-primary w-full " />
                                                </div>
                                                <div className="mt-7 mb-3 ">
                                                    <label className="block text-orange-500 text-lg font-bold mb-2">
                                                        Passport or National ID Photo.
                                                    </label>
                                                    <input
                                                        name='nationalid'
                                                        onChange={input}
                                                        type="file"
                                                        className="file-input file-input-bordered file-input-primary w-full " />
                                                </div>
                                                <div className="mt-4 ">
                                                    <label className="block text-orange-500 text-lg font-bold mb-2">
                                                        Profile Picture
                                                    </label>
                                                    <input
                                                        name='image'
                                                        onChange={input}
                                                        type="file"
                                                        className="file-input file-input-bordered file-input-primary w-full " />
                                                </div>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                            <div class="w-full px-3 my-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-orange-400 text-base font-bold mb-3 mt-8" for="grid-first-name">
                                    Video Youtube Link
                                </label>
                                <input onChange={input} name='youtube_link' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
                            </div>
                            <div class="w-full px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-orange-400 text-base font-bold mb-3 mt-8" >
                                    Biography
                                </label>
                                <textarea onChange={input} name='intro' class="appearance-none block w-full h-48 bg-gray-200 text-gray-700 border border-red-500 rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder='Write About Yourself And Your Qualifications ( Note: write ONLY 500 Letters )' />
                            </div>
                            <div class="w-full pt-3 pb-5 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-orange-400 text-base font-bold mb-3 mt-5">
                                    What Language Do You Want To Teach?
                                </label>
                                <div class="relative">
                                    <select onChange={input} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='course_id'>
                                        <option hidden >Select</option>
                                        <option value={"0"}>English</option>
                                        <option value={"1"}>German</option>
                                        <option value={"2"}>French</option>
                                        <option value={"3"}>Arabic</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="selectLanguage">
                                    <label class="block uppercase tracking-wide text-orange-400 text-base font-bold mb-3 mt-8" >
                                        Languages You Speak
                                    </label>
                                    <div class="relative">
                                        <select onChange={input} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='language_id'>
                                            <option hidden >Select</option>
                                            <option value={"English"}>English</option>
                                            <option value={"Arabic"}>Arabic</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                                        </div>
                                    </div>
                                </div>
                                {/* <div className="btnAddSelectLanguage">
                                    <button className="btn px-10 py-4 bg-green-500 text-white text-xl ">+</button>
                                </div> */}
                            </div>
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-orange-400 text-base font-bold mb-3 mt-8" >
                                    Language Proficiency
                                </label>
                                <div class="relative">
                                    <select onChange={input} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='proficiency_id'>
                                        <option hidden >Select</option>
                                        <option value={"Beginner"}>Beginner</option>
                                        <option value={"Intermediate"}>Intermediate</option>
                                        <option value={"Advanced"}>Advanced</option>
                                        <option value={"Native"}>Native</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                                    </div>
                                </div>
                            </div>
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <div className="mt-16 w-full flex flex-wrap justify-center">
                                <button class="text-white bg-[#ff5a1f] duration-500 hover:bg-orange-400 font-bold py-4 text-lg px-8 rounded-3xl focus:outline-none focus:shadow-outline" type="submit" >
                                    {loading ? <span className="loading loading-infinity loading-lg h-4"></span>
                                        : "Save Change"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}