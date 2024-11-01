import { useMemo, useState, useRef, useEffect } from "react";
import userProfile from "../Assets/images/profile.jpg";
import axios from "axios";
import countryList from "react-select-country-list";
import timezone from "../timezones.json";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function Account() {
  const options = useMemo(() => countryList().getData(), []);
  const timezoneMap = useMemo(() => timezone, []);
  const [imgAvatar, setImgAvatar] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [profileInput, setProfileInput] = useState({
    image: "",
    country: "",
    timezone: "",
    gender: "",
    whats: "",
    firstname: "",
    lastname: "",
  });
  const userToken = localStorage.getItem("user");
  const userData = userToken ? JSON.parse(userToken) : null;

  // Reference for file input
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("accessToken");

  async function profile() {
    const formData = new FormData();

    // Append image file only if it exists and is a JPG
    if (imgAvatar && imgAvatar.type === "image/jpeg") {
      formData.append("image", imgAvatar);
    }

    // Append other profile inputs
    formData.append("country", profileInput.country || userData.country);
    formData.append("timezone", profileInput.timezone || userData.timezone);
    formData.append("gender", profileInput.gender || userData.gender);
    formData.append("whats", profileInput.whats || userData.whats);
    formData.append("firstname", profileInput.firstname || userData.firstname);
    formData.append("lastname", profileInput.lastname || userData.lastname);

    try {
      const response = await axios.post(
        `https://yousab-tech.com/unihome/public/api/auth/user-profile/${userData.type}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set user data and store in localStorage
      setDataUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // After successfully updating the profile, refresh the token
      await refreshToken();
    } catch (error) {
      console.error("Error uploading profile:", error);
    }
  }


  async function refreshToken() {
    try {
      const response = await axios.post(
        `https://yousab-tech.com/unihome/public/api/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local storage with new tokens and user data
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Optionally set state if needed
      setDataUser(response.data.user);
      toast.success(t("Profile updated successfully."))
    } catch (error) {
      toast.error(t("An error occurred while updating your information. Please check your inputs and try again."))
      console.error("Error refreshing token:", error);
    }
  }


  function input(e) {
    const { name, value } = e.target;
    setProfileInput((prevInput) => {
      const updatedInput = {
        ...prevInput,
        [name]: value,
      };

      // Update timezone if country changes
      if (name === "country") {
        updatedInput.timezone = timezoneMap[value] || "";
      }

      return updatedInput;
    });
  }

  function uploadPictureProfile(e) {
    const file = e.target.files[0];

    // Check if file is of type image/jpeg
    if (file && file.type !== "image/jpeg") {
      toast.error(t("Please upload a JPG image."));
      toast.error(t("Only JPG images are allowed."));
      fileInputRef.current.value = ""; // Reset file input
      return;
    }

    setImgAvatar(file); // Set the file if it’s a JPEG
    fileInputRef.current.value = ""; // Reset file input after setting
  }

  function removePictureProfile() {
    setImgAvatar(null);
  }

  const { t } = useTranslation();

  return (
    <>
      <section className="p-5 bg-gray-100 rounded-3xl max-w-lg sm:max-w-xl lg:max-w-4xl accountSettings mx-auto">
        <div className="w-full flex flex-col md:flex-row justify-between flex-wrap" id="profileSetting">
          {/* Form Section */}
          <div className="formSetting basis-full mb-10">
            <form className="w-full">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block capitalize tracking-wide text-blue-600 text-sm font-bold mb-2 ms-5" htmlFor="grid-first-name">
                    {t("form.firstName")}
                  </label>
                  <input
                    onChange={input}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded-3xl py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder={userData.firstname}
                    name="firstname"
                    value={profileInput.firstname || userData.firstname}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block capitalize tracking-wide text-blue-600 text-sm font-bold mb-2 ms-5" htmlFor="grid-last-name">
                    {t("form.lastName")}
                  </label>
                  <input
                    onChange={input}
                    className="appearance-none block w-full bg-gray-200 text-gray-600 border-none rounded-3xl py-4 px-4 leading-tight focus:outline-none focus:bg-white"
                    id="grid-last-name"
                    type="text"
                    placeholder={userData.lastname}
                    name="lastname"
                    value={profileInput.lastname || userData.lastname}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="basis-full w-full px-3">
                  <label className="block capitalize tracking-wide text-blue-600 text-sm font-bold mb-2 ms-5" htmlFor="grid-whats">
                    {t("form.whatsappNumber")}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded-3xl py-4 px-4 m-0 leading-tight focus:outline-none focus:bg-white"
                    id="grid-whats"
                    type="text"
                    placeholder={userData.whats}
                    name="whats"
                    value={profileInput.whats || userData.whats}
                    onChange={input}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="flex flex-col basis-full w-full gap-2 px-3">
                  <label className="block capitalize tracking-wide text-blue-600 text-sm font-bold ms-6">
                    {t("form.gender")}
                  </label>
                  <div className="flex gap-4">
                    <div className="flex items-center basis-1/2 shadow-inner shadow-gray-500 ps-4 border border-gray-200 rounded-3xl ms-3">
                      <input
                        onChange={input}
                        id="bordered-radio-1"
                        type="radio"
                        value="female"
                        name="gender"
                        checked={userData.gender === "female"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="bordered-radio-1" className="w-full py-3 px-4 text-sm font-medium text-gray-900">
                        {t("form.female")}
                      </label>
                    </div>
                    <div className="flex items-center basis-1/2 shadow-inner shadow-gray-500 ps-4 border border-gray-200 rounded-3xl">
                      <input
                        onChange={input}
                        id="bordered-radio-2"
                        type="radio"
                        value="male"
                        name="gender"
                        checked={userData.gender === "male"}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="bordered-radio-2" className="w-full py-4 ms-3 text-sm font-medium text-gray-900">
                        {t("form.male")}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block capitalize tracking-wide text-blue-600 text-sm font-bold mb-2 ms-5" htmlFor="grid-country">
                    {t("form.country")}
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 text-gray-700 py-4 px-4 pr-8 rounded-3xl leading-tight focus:outline-none focus:bg-white"
                      id="grid-country"
                      name="country"
                      onChange={input}
                      value={profileInput.country || userData.country}
                    >
                      <option hidden>{t("Select")}</option>
                      {options.map((option, index) => (
                        <option key={index} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block capitalize tracking-wide text-blue-600 text-sm font-bold mb-2 ms-5" htmlFor="grid-timezone">
                    {t("form.timezone")}
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 text-gray-700 py-4 px-4 pr-8 rounded-3xl leading-tight focus:outline-none focus:bg-white"
                      id="grid-timezone"
                      name="timezone"
                      onChange={input}
                      value={profileInput.timezone || userData.timezone}
                      disabled
                    >
                      <option value="">{t("Select timezone")}</option>
                      {Object.entries(timezoneMap).map(([key, value]) => (
                        <option key={key} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Avatar and Buttons */}
              <div className="pictureAvatar flex flex-col justify-center items-center basis-full md:basis-1/2">
                <span className="font-bold text-lg mb-4">{t("Change your profile picture")}</span>
                <img
                  className="w-24 h-24 md:w-36 md:h-36 avatar mt-5 mb-5 rounded-full shadow-lg shadow-black"
                  src={userData.image}
                  alt="avatar"
                  id="avatar"
                />
                <div className="btnPicture w-full flex flex-col items-center duration-500 transition-all">
                  <div className="mt-4">
                    <label
                      htmlFor="upload"
                      className="border-2 border-orange-500 bg-orange-500 hover:bg-white hover:text-black cursor-pointer duration-500 w-full text-white font-bold py-2 px-10 md:px-20 rounded-3xl focus:outline-none focus:shadow-outline"
                    >
                      {t("Upload")}
                    </label>
                    <input
                      className="w-full"
                      hidden
                      type="file"
                      id="upload"
                      name="image"
                      ref={fileInputRef}
                      onChange={uploadPictureProfile}
                    />
                  </div>
                  {imgAvatar && (
                    <div className="mt-4">
                      <button
                        onClick={removePictureProfile}
                        className="border-2 border-red-600 bg-red-600 hover:bg-white hover:text-black cursor-pointer duration-500 w-full text-white font-bold py-2 px-10 md:px-20 rounded-3xl focus:outline-none focus:shadow-outline"
                      >
                        {t("Remove")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="formBtn flex flex-col justify-center items-center w-full mt-10">
          <button
            onClick={profile}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 md:px-10 rounded-3xl focus:outline-none focus:shadow-outline"
          >
            {t("Save Changes")}
          </button>
        </div>
      </section>

    </>
  );
}
