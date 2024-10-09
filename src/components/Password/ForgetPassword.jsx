import React, { useState } from 'react'
import imgForget from '../Assets/ForgetPassword.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';


export default function ForgetPassword() {
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [inputEmail, setInputEmail] = useState({
        email: ""
    });

    const { t } = useTranslation();

    async function submitEmail() {
        try {
            let response = await axios.post("https://yousab-tech.com/unihome/public/api/password/email", inputEmail)
            navigate("/resetPassord")
            console.log(response);
        }
        catch (error) {
            setError("The Email doesn't exist");
        }
        setLoading(false)
    }

    function input(e) {
        let emailUser = { ...inputEmail };
        emailUser[e.target.name] = e.target.value;
        setInputEmail(emailUser);
        console.log(inputEmail);
    }

    function submit(e) {
        e.preventDefault();
        setLoading(true)
        submitEmail()
    }
    return <>
        <Helmet>
            <title>Forget Password</title>
        </Helmet>
        <section className="h-screen login flex flex-row  flex-wrap justify-around items-center		">
            <div className="uniHomeImg xl:basis-1/3 md:basis-3/5  w-full  ">
                <img src={imgForget} alt="img Login" className='w-full m-auto' />
            </div>
            <div class="formLogin xl:basis-2/5 lg:basis-2/5 basis-full ">
                <div className=" flex bg-white rounded-lg shadow-lg border overflow-hidden w-full  py-10">
                    <div className="w-full p-8 ">
                        <p className="text-2xl pb-5 font-bold text-gray-600 text-center">{t("Forget Password")}</p>
                        <form onSubmit={submit}>
                            {error ? <div class="bg-red-100 border w-full mt-5 mb-10 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <strong class="font-bold">{error}</strong>
                            </div> : ""}
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    {t("emailL")}
                                </label>
                                <input
                                    className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 block w-full focus:border-blue-700"
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    required
                                    onChange={input}
                                    name="email"
                                />
                            </div>
                            <div className="mt-8 flex justify-center">
                                <button class="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-3 px-4 rounded-3xl focus:outline-none focus:shadow-outline" type="submit" >
                                    {loading ? <span className="loading loading-infinity loading-lg h-4"></span>
                                        : "Reset Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section >
    </>
}
