import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import imgLogo from '../Assets/6321602.jpg';
import "./Profile.css";
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

export default function EditPassword() {
    const [loading, setLoading] = useState(false);
    const [errorResponse, setErrorResponse] = useState([]);
    const [editData, setEditData] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false); // To show success message
    const token = localStorage.getItem("accessToken");
    let dataUser = JSON.parse(localStorage.getItem("user"));

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Password validation schema
    let mySchema = Yup.object({
        current_password: Yup.string().required("Current password is required"),

        new_password: Yup.string()
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/,
                "The new password must be at least 6 characters, with a mix of upper/lowercase, numbers, and special characters."
            )
            .required("New password is required"),

        new_password_confirmation: Yup.string()
            .oneOf([Yup.ref("new_password"), null], "The password confirmation does not match")
            .required("Password confirmation is required")
    });

    let formik = useFormik({
        initialValues: {
            current_password: "",
            new_password: "",
            new_password_confirmation: ""
        },
        validationSchema: mySchema,
        onSubmit: async (values) => {
            await chgPassword(values);
            formik.resetForm(); // Reset form after successful submission
        }
    });

    async function chgPassword(values) {
        setLoading(true);
        try {
            let response = await axios.post(`https://yousab-tech.com/unihome/public/api/auth/user-profile/${dataUser.type}`, values, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setLoading(false);
            setEditData(response.data);
            setShowSuccess(true); // Show success message after password change
            setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
        }
        catch (error) {
            setErrorResponse(error.response.data);
            setLoading(false);
        }
    }

    const { t } = useTranslation();

    return (
        <>
            <section className="changePassword h-full mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl flex justify-center items-center">
                <form className="w-full px-10 py-10 mx-auto border-2 bg-gray-100 border-orange-400 rounded-3xl" onSubmit={formik.handleSubmit}>
                    <div className="img flex justify-center">
                        <img src={imgLogo} alt="" className='w-40 mb-10' />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="currentPassword" className="block ms-4 mb-2 text-sm font-bold text-blue-600 dark:text-white">
                            {t("Current Password")}
                        </label>
                        <div className="relative">
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.current_password}
                                type={passwordVisible ? "text" : "password"}
                                id="currentPassword"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="current_password"
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center">
                                <button type="button" onClick={togglePasswordVisibility} className="text-gray-500">
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        {formik.touched.current_password && formik.errors.current_password ? (
                            <div className="text-red-500 text-xs mt-2 font-bold">
                                {formik.errors.current_password}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="newPassword" className="block ms-4 mb-2 text-sm font-bold text-blue-600 dark:text-white">
                            {t("New Password")}
                        </label>
                        <div className="relative">
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.new_password}
                                type={passwordVisible ? "text" : "password"}
                                id="newPassword"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="new_password"
                                required
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center">
                                <button type="button" onClick={togglePasswordVisibility} className="text-gray-500">
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        {formik.touched.new_password && formik.errors.new_password ? (
                            <div className="text-red-500 text-xs mt-2 font-bold">
                                {formik.errors.new_password}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block ms-4 mb-2 text-sm font-bold text-blue-600 dark:text-white">
                            {t("Confirm Password")}
                        </label>
                        <div className="relative">
                            <input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.new_password_confirmation}
                                type={passwordVisible ? "text" : "password"}
                                id="confirmPassword"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                name="new_password_confirmation"
                                required
                            />
                            <div className="absolute inset-y-0 right-4 flex items-center">
                                <button type="button" onClick={togglePasswordVisibility} className="text-gray-500">
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        {formik.touched.new_password_confirmation && formik.errors.new_password_confirmation ? (
                            <div className="text-red-500 text-xs mt-2 font-bold">
                                {formik.errors.new_password_confirmation}
                            </div>
                        ) : null}
                    </div>
                    <div className="mt-11">
                        <button className="profileButton" type="submit">
                            {loading ? <span className="loading loading-infinity loading-lg h-4"></span> : t("Save Changes")}
                        </button>
                    </div>
                    {showSuccess && (
                        <div className="text-green-500 text-center mt-4 font-bold">
                            {t("Password changed successfully")}
                        </div>
                    )}
                </form>
            </section>
        </>
    );
}
