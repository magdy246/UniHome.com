import React, { useState } from 'react';
import imgForget from '../Assets/ForgetPassword.png';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); // For tracking success response
    const [inputEmail, setInputEmail] = useState({
        email: ""
    });

    const { t } = useTranslation();

    async function submitEmail() {
        try {
            let response = await axios.post("https://yousab-tech.com/unihome/public/api/password/email", inputEmail);
            console.log(response);
            setSuccess(true);
        }
        catch (error) {
            setError("The Email doesn't exist");
        }
        setLoading(false);
    }

    function input(e) {
        let emailUser = { ...inputEmail };
        emailUser[e.target.name] = e.target.value;
        setInputEmail(emailUser);
        console.log(inputEmail);
    }

    function submit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        submitEmail();
    }

    return <>
        <Helmet>
            <title>Forget Password</title>
        </Helmet>

        {/* Success Modal */}
        {success && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Check your inbox</h2>
                    <p className="mb-4">We've sent you an email. Please check your inbox to reset your password.</p>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-2xl"
                        onClick={() => setSuccess(false)}
                    >
                        OK
                    </button>
                </div>
            </div>
        )}

        <section className="h-full login flex flex-row flex-wrap justify-around items-center">
            <div className="uniHomeImg xl:basis-1/3 md:basis-3/5 w-full">
                <img src={imgForget} alt="img Login" className='w-full m-auto' />
            </div>
            <div className="formLogin xl:basis-2/5 lg:basis-2/5 basis-full">
                <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden w-full py-10">
                    <div className="w-full p-8">
                        <p className="text-2xl pb-5 font-bold text-gray-600 text-center">{t("Forget Password")}</p>
                        <form onSubmit={submit}>
                            {error && (
                                <div className="bg-red-100 border w-full mt-5 mb-10 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">{error}</strong>
                                </div>
                            )}
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
                                <button className="bg-blue-500 hover:bg-blue-700 w-1/2 text-white font-bold py-3 px-4 rounded-3xl focus:outline-none focus:shadow-outline" type="submit" >
                                    {loading ? <span className="loading loading-infinity loading-lg h-4"></span>
                                        : "Reset Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}
