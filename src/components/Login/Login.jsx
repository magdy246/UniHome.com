import React, { useEffect, useState } from "react";
import imgLogin from "../Assets/LogIN.png";
import axios from "axios";
// import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function login() {
    try {
      let response = await axios.post(
        "https://yousab-tech.com/unihome/public/api/auth/login",
        loginInput
      );
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      setError("The email or password you entered doesn't match");
    }
    setLoading(false);
  }

  async function loginWithGooFace(typeLogin) {
    try {
      let response = await axios.get(`https://yousab-tech.com/unihome/public/api/auth/${typeLogin}`);
      window.location.href = response.data.url; // Redirect to the Google or Facebook URL
    } catch (error) {
      console.log(error.message); // Logs any error that occurs
    }
  }

  function input(e) {
    let loginUser = { ...loginInput };
    loginUser[e.target.name] = e.target.value;
    setLoginInput(loginUser);
  }

  function submitLogin(e) {
    e.preventDefault();
    setLoading(true);
    login();
  }

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Login - UniHome</title>
        <meta name="description" content="Access your UniHome account. Log in to continue learning English with our professional tutors and personalized courses." />
        <meta name="keywords" content="UniHome, login, English courses, online learning, access account, education, learn English" />
        <meta name="author" content="UniHome" />
        <meta property="og:title" content="Login - UniHome" />
        <meta property="og:description" content="Log in to your UniHome account and continue your journey to learn English with personalized support." />
        <meta property="og:image" content="/src/components/Assets/images/UniHome.png" />
        <meta property="og:url" content="https://unih0me.com/Login" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - UniHome" />
        <meta name="twitter:description" content="Log in to your UniHome account to access personalized English courses and support." />
        <meta name="twitter:image" content="/src/components/Assets/images/UniHome.png" />
        <link rel="canonical" href="https://unih0me.com/Login" />
      </Helmet>
      <section className="h-full login flex flex-row  flex-wrap justify-around items-center py-6">
        <div className="uniHomeImg xl:basis-1/3 md:basis-3/5 basis-7/12 ">
          <img src={imgLogin} alt="img Login" className=" w-[95vw] m-auto" />
        </div>

        <div className="formLogin xl:basis-2/5 lg:basis-2/5 basis-full">
          <div className=" flex bg-white rounded-lg shadow-lg border overflow-hidden w-full">
            <div className="w-full p-8 ">
              <p className="text-2xl pb-5 text-gray-600 text-center">
                {t("Welcome")} {t("to")} <span className="text-blue-700 font-bold">{t("UniAbout")}</span><span className="text-orange-500 font-bold">{t("HomeLog")}</span>
              </p>
              <form onSubmit={submitLogin}>
                {error && (
                  <div
                    className="bg-red-100 border w-full mt-5 mb-10 border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
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
                <div className="mt-4 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {t("password")}
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      onChange={input}
                      name="password"
                      className="text-gray-700 border-2 border-gray-300 rounded-2xl py-2 px-4 block w-full focus:border-blue-700"
                      id="grid-password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("passwordPlaceholder")}
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

                  {/* <Link
                    to={"/forgetPassword"}
                    className="text-sm text-gray-500 font-bold hover:text-gray-900 text-end w-full mt-2"
                  >
                    {t("forgetPassword")}
                  </Link> */}
                </div>
                <div className="mt-8">
                  <button className="auth_button" type="submit">
                    {loading ? (
                      <span className="loading loading-infinity loading-lg h-4"></span>
                    ) : (
                      t("login")
                    )}
                  </button>
                </div>
              </form>

              <div className="loginWithGoogle">
                <button className=" flex px-5 w-full py-3 items-center justify-center mt-4 text-white rounded-full shadow-md hover:bg-gray-100" onClick={() => { loginWithGooFace('google') }}>
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
                </button>
              </div>

              {/* <div className="loginWithFacebook">
                <button className=" flex px-5 w-full py-3 items-center justify-center mt-4 text-white rounded-full shadow-md hover:bg-gray-100" onClick={() => { loginWithGooFace('facebook') }}>
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
                </button>
              </div> */}

              <div className="mt-4 flex items-center w-full text-center">
                <a
                  href="#"
                  className="text-base text-gray-500 capitalize text-center w-full"
                >
                  {t("signIn.noAccount")}
                  <Link to={"/register"}>
                    <span className="text-blue-700 ms-2 font-bold">
                      {t("Register")}
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