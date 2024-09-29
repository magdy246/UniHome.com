import React, { useState, useMemo } from "react";
import imgRegister from "../Assets/4794658-removebg-preview.png";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import timezone from "../timezones.json";
import { useTranslation } from "react-i18next";
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

  async function register(e) {

    try {
      let response = await axios.post(
        `https://unih0me.com/api/auth/register/${teacherOrStudent}`,
        registerInput
      );

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
      localStorage.setItem("user", "teacher");
    } else {
      setTeacherOrStudent("student");
      localStorage.setItem("user", "student");
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
        <title>Register</title>
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
                    value={teacherOrStudent} class="sr-only peer"></input>
                  <div class="relative w-11 h-6 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-700"></div>
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

                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      {t('form.password')}
                    </label>
                    <input
                      name="password"
                      onChange={input}
                      className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      id="grid-password"
                      type="password"
                      placeholder={t('form.password')}
                    />
                  </div>

                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="confirm_password"
                    >
                      {t('form.confirmPassword')}
                    </label>
                    <input
                      name="confirm_password"
                      onChange={input}
                      className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      id="confirm_password"
                      type="password"
                      placeholder={t('form.confirmPassword')}
                    />
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

              <a
                href="#"
                className=" flex items-center justify-center mt-4 text-white rounded-full shadow-md hover:bg-gray-100"
              >
                <div className="flex px-5 justify-center w-full py-3">
                  <div className="min-w-[30px]">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#1976D2"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full justify-center">
                    <h1 className="whitespace-nowrap text-gray-600 font-bold">
                      {t("signIn.google")}
                    </h1>
                  </div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center justify-center my-6 text-white rounded-full shadow-md hover:bg-gray-100"
              >
                <div className="flex px-5 justify-center w-full py-3">
                  <div className="min-w-[30px]">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                      <path
                        d="M20 0C8.955 0 0 8.955 0 20c0 9.157 6.379 16.703 14.688 19.217v-13.607H10.297V20h4.391v-3.25c0-4.343 2.578-6.75 6.49-6.75 1.883 0 3.943.344 3.943.344v4.308h-2.22c-2.188 0-2.875 1.355-2.875 2.743V20h4.687l-.75 5.61h-3.938V39.217C33.621 36.703 40 29.157 40 20c0-11.045-8.955-20-20-20z"
                        fill="#3b5998"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full justify-center">
                    <h1 className="whitespace-nowrap text-gray-600 font-bold">
                      {t("signIn.facebook")}
                    </h1>
                  </div>
                </div>
              </a>

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
