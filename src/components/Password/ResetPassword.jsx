import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import imgForget from '../Assets/6321602.jpg';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [forgetPasswordInput, setForgetPasswordInput] = useState({
        email: "",
        token: "",
        password: "",
        password_confirmation: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    const location = useLocation(); // Get the location object

    // Extract email and token from the URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        const token = params.get('token');

        // Update state with email and token from URL
        setForgetPasswordInput(prevState => ({
            ...prevState,
            email: email || "",
            token: token || ""
        }));
    }, [location.search]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        setForgetPasswordInput({ ...forgetPasswordInput, [e.target.name]: e.target.value });
    };

    async function submitPassword() {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(`https://yousab-tech.com/unihome/public/api/password/email`, {
                email: forgetPasswordInput.email,
                token: forgetPasswordInput.token,
                password: forgetPasswordInput.password,
                password_confirmation: forgetPasswordInput.password_confirmation,
            });
            setSuccess("Password reset successful. You can now log in with your new password.");
            console.log(response);
        } catch (error) {
            setError("Failed to reset password. Please make sure all fields are correctly filled.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (forgetPasswordInput.password !== forgetPasswordInput.password_confirmation) {
            setError("Passwords do not match.");
        } else {
            submitPassword();
        }
    }

    return (
        <>
            <Helmet>
                <title>{t("Reset Password")}</title>
            </Helmet>
            <section className="applicationTeacher h-screen register flex flex-row flex-wrap justify-around items-center">
                <div className="uniHomeImg xl:basis-1/3 md:basis-3/5 basis-7/12">
                    <img src={imgForget} alt="img Login" className="w-full m-auto" />
                </div>
                <div className="formRegister xl:basis-2/5 lg:basis-2/5 basis-full">
                    <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden w-full">
                        <div className="w-full p-5">
                            <p className="text-2xl text-gray-600 text-center mb-5">{t("Reset Password")}</p>
                            <form className="w-full" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-100 border w-full mt-5 mb-10 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">{error}</strong>
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-green-100 border w-full mt-5 mb-10 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                        <strong className="font-bold">{success}</strong>
                                    </div>
                                )}
                                <div className="mt-4 mx-auto w-5/6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        {t("emailL")}
                                    </label>
                                    <input
                                        className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 block w-full focus:border-blue-700"
                                        type="email"
                                        name="email"
                                        value={forgetPasswordInput.email}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mt-4 mx-auto w-5/6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        {t("password")}
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 block w-full focus:border-blue-700"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder={t("passwordPlaceholder")}
                                            required
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-700 focus:outline-none"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 mx-auto w-5/6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        {t("Confirm Password")}
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 block w-full focus:border-blue-700"
                                            type={showPassword ? "text" : "password"}
                                            name="password_confirmation"
                                            placeholder={t("Confirm Password")}
                                            required
                                            onChange={handleInputChange}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-3 flex items-center text-gray-700 focus:outline-none"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 w-1/3 text-white font-bold py-3 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="loading loading-infinity loading-lg h-4"></span>
                                        ) : (
                                            t("Reset Password")
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
