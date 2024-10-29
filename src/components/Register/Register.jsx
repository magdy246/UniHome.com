import React, { useState, useMemo } from "react";
import imgRegister from "../Assets/4794658-removebg-preview.png";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import timezone from "../timezones.json";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

export default function Register() {
  const options = useMemo(() => countryList().getData(), []);
  const timezoneMap = useMemo(() => timezone, []);

  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teacherOrStudent, setTeacherOrStudent] = useState("student");
  const [registerInput, setRegisterInput] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    password: "",
    confirm_password: "",
    whats: "",
    accept_terms: "1",
    country: "",
    timezone: "",
    source: "",
    type: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function register(e) {
    try {
      let response = await axios.post(
        `https://yousab-tech.com/unihome/public/api/auth/register/${teacherOrStudent}`,
        registerInput
      );

      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      let filed = Object.keys(JSON.parse(error.response.data));
      for (let f of filed) {
        correct(f);
      }
    }
    setLoading(false);
  }

  function correct(cor) {
  }

  function selectUser(e) {
    if (e.target.value === "student") {
      setTeacherOrStudent("teacher");
      // localStorage.setItem("type", "teacher");
    } else {
      setTeacherOrStudent("student");
      // localStorage.setItem("type", "student");
    }
  }

  function input(e) {
    let registerUser = { ...registerInput };
    const { name, value } = e.target;
    registerUser[name] = value;

    // Automatically set timezone when the country changes
    if (name === "country") {
      const selectedCountryTimezone = timezoneMap[value] || ""; // Set timezone based on selected country
      registerUser.timezone = selectedCountryTimezone; // Update the timezone in the state
    }

    registerUser.type = teacherOrStudent;
    setRegisterInput(registerUser);
  }

  function submitRegister(e) {
    e.preventDefault();
    setLoading(true);
    register();
  }

  // function matchPassword() {
  //     if (registerInput.password == registerInput.confirm_password) {
  //         register()
  //     }
  //     else
  //         <p className='text-red-600 text-xs mb-5'>The Password confirmation does not match. </p>
  // }
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Register - UniHome</title>
        <meta name="description" content="Join UniHome today! Sign up for personalized English courses with professional tutors and flexible scheduling." />
        <meta name="keywords" content="UniHome, register, sign up, English courses, personalized learning, online courses, professional tutors" />
        <meta name="author" content="UniHome" />
        <meta property="og:title" content="Register - UniHome" />
        <meta property="og:description" content="Sign up for UniHome and start your journey to learn English in a fun and effective way!" />
        <meta property="og:image" content="/src/components/Assets/images/UniHome.png" />
        <meta property="og:url" content="https://unih0me.com/register" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register - UniHome" />
        <meta name="twitter:description" content="Join UniHome today and start learning English with our expert tutors!" />
        <meta name="twitter:image" content="/src/components/Assets/images/UniHome.png" />
        <link rel="canonical" href="https://unih0me.com/register" />
      </Helmet>
      <section className="h-full register flex flex-row flex-wrap justify-around items-start py-6">
        <div className="uniHomeImg xl:basis-1/3 md:basis-3/5 basis-7/12 ">
          <img src={imgRegister} alt="img Register" className="w-4/5 m-auto" />
        </div>

        <div className="formRegister xl:basis-2/5 lg:basis-2/5 basis-full">
          <div className=" flex bg-white rounded-lg shadow-lg border overflow-hidden w-full">
            <div className="w-full p-5 ">
              <p className="text-2xl text-gray-600 text-center">{t("Welcome")} {t("to")} <span className="text-blue-700 font-bold">{t("UniAbout")}</span><span className="text-orange-500 font-bold">{t("HomeLog")}</span></p>
              <div className="selectUser my-10 flex justify-center">
                <label className="flex cursor-pointer gap-2">
                  <span className="label-text text-base font-bold">
                    {t("Student")}
                  </span>
                  <input onChange={selectUser}
                    name="type"
                    type="checkbox"
                    value={teacherOrStudent} className="sr-only peer"></input>
                  <div className="relative w-11 h-6 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-700"></div>
                  <span className="label-text text-base	font-bold">
                    {t("Teacher")}
                  </span>
                </label>
              </div>

              <form className="w-full" onSubmit={submitRegister}>
                {error ? (
                  <div
                    className="bg-red-100 border w-full mt-5 mb-10 border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">{error}</strong>
                  </div>
                ) : (
                  ""
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      {t('form.firstName')}
                    </label>
                    <input
                      onChange={input}
                      name="firstname"
                      className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      id="grid-first-name"
                      type="text"
                      placeholder={t('form.firstName')}
                    />
                  </div>

                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      {t('form.lastName')}
                    </label>
                    <input
                      onChange={input}
                      name="lastname"
                      className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      id="grid-last-name"
                      type="text"
                      placeholder={t('form.lastName')}
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-email"
                    >
                      {t('form.emailR')}
                    </label>
                    <input
                      onChange={input}
                      name="email"
                      className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      id="grid-email"
                      type="email"
                      placeholder={t('form.emailR')}
                    />
                  </div>

                  {/* Password Input */}
                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t('form.password')}
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        onChange={input}
                        className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        id="grid-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t('form.password')}
                        dir='ltr'
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

                  {/* Confirm Password Input */}
                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="confirm_password"
                    >
                      {t('form.confirmPassword')}
                    </label>
                    <div className="relative">
                      <input
                        name="confirm_password"
                        onChange={input}
                        className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        id="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t('form.confirmPassword')}
                        dir='ltr'
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-700 focus:outline-none"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>

                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="gender"
                    >
                      {t('form.gender')}
                    </label>
                    <div className="relative">
                      <select
                        onChange={input}
                        className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        id="gender"
                        name="gender"
                      >
                        <option hidden>{t('form.selectGender')}</option>
                        <option value="female">{t('form.female')}</option>
                        <option value="male">{t('form.male')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="whatsapp_number"
                    >
                      {t('form.whatsappNumber')}
                    </label>
                    <input
                      onChange={input}
                      name="whats"
                      className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      id="whatsapp_number"
                      type="text"
                      placeholder={t('form.whatsappNumber')}
                    />
                  </div>

                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="country"
                    >
                      {t('form.country')}
                    </label>
                    <div className="relative">
                      <select
                        name="country"
                        onChange={input}
                        className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <option hidden>{t('form.selectCountry')}</option>
                        {Object.keys(timezoneMap).map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="timezone"
                    >
                      {t('form.timezone')}
                    </label>
                    <div className="relative">
                      <select
                        name="timezone"
                        className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={registerInput.timezone}
                        disabled
                      >
                        <option hidden>{t('form.timezone')}</option>
                        <option value={registerInput.timezone}>
                          {registerInput.timezone}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="source"
                    >
                      {t('form.source')}
                    </label>
                    <div className="relative">
                      <select
                        onChange={input}
                        name="source"
                        className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        id="source"
                      >
                        <option hidden>{t('form.selectSource')}</option>
                        <option value="facebook">{t('form.facebook')}</option>
                        <option value="twitter">{t('form.twitter')}</option>
                        <option value="instagram">{t('form.instagram')}</option>
                        <option value="friend">{t('form.friend')}</option>
                        <option value="youtube">{t('form.youtube')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="acceptTerms flex gap-2 mt-5">
                  <input
                    onChange={input}
                    type="checkbox"
                    className="w-4"
                    name="accept_terms"
                    value={1}
                  />
                  <p
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    {t('terms.title')}{" "}
                    <span className="text-blue-500 hover:underline underline-offset-1 cursor-pointer">
                      {t('terms.title')}
                    </span>
                  </p>

                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg">{t('terms.title')}</h3>
                      <p className="py-4">{t('terms.intro')}</p>
                      <h4 className="font-bold">{t('terms.section1.title')}</h4>
                      <p>{t('terms.section1.content')}</p>
                      <h4 className="font-bold">{t('terms.section2.title')}</h4>
                      <p>{t('terms.section2.content')}</p>
                      <h4 className="font-bold">{t('terms.section3.title')}</h4>
                      <p>{t('terms.section3.content')}</p>
                      <h4 className="font-bold">{t('terms.section4.title')}</h4>
                      <p>{t('terms.section4.content')}</p>
                      <h4 className="font-bold">{t('terms.section5.title')}</h4>
                      <p>{t('terms.section5.content')}</p>
                      <h4 className="font-bold">{t('terms.section6.title')}</h4>
                      <p>{t('terms.section6.content')}</p>
                      <h4 className="font-bold">{t('terms.section7.title')}</h4>
                      <p>{t('terms.section7.content')}</p>
                      <h4 className="font-bold">{t('terms.section8.title')}</h4>
                      <p>{t('terms.section8.content')}</p>
                      <h4 className="font-bold">{t('terms.section9.title')}</h4>
                      <p>{t('terms.section9.content')}</p>
                      <h4 className="font-bold">{t('terms.section10.title')}</h4>
                      <p>{t('terms.section10.content')}</p>
                      <h4 className="font-bold">{t('terms.section11.title')}</h4>
                      <p>{t('terms.section11.content')}</p>
                      <h4 className="font-bold">{t('terms.section12.title')}</h4>
                      <p>{t('terms.section12.content')}</p>
                      <h4 className="font-bold">{t('terms.section13.title')}</h4>
                      <p>{t('terms.section13.content')}</p>
                    </div>
                  </dialog>
                </div>

                <div className="mt-8">
                  <button
                    className="auth_button"
                    type="submit"
                  >
                    {loading ? (
                      <span className="loading loading-infinity loading-lg h-4"></span>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-4 flex items-center w-full text-center">
                <a
                  href="#"
                  className="text-base text-gray-500 capitalize text-center w-full"
                >
                  {t("signIn.noAccount")}
                  <Link to={"/logIn"}>
                    <span className="text-blue-700 ms-2 font-bold">
                      {t("signIn.login")}
                    </span>
                  </Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
