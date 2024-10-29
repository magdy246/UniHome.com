import React, { useEffect, useState } from "react";
import userCommentIcon from "../Assets/images/userComment.com.png";
import rate from "../Assets/images/Animation-rate.gif";
import "./Reviews.css";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

export default function Reviews(teacher) {
  const { t } = useTranslation();

  const token = localStorage.getItem("accessToken");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [trueSendComment, setTrueSendComment] = useState(false);
  const [rating, setRating] = useState(0);
  let teach = teacher.teacher;
  let user = JSON.parse(localStorage.getItem("user"));

  const [inputComment, setInputComment] = useState({
    teacher_id: teach,
    comment: "",
    rate: "",
  });
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (trueSendComment) {
      getData();
      setTrueSendComment(false);
    }
  }, [trueSendComment]);
  async function getData() {
    try {
      let response = await axios.get(
        `https://yousab-tech.com/unihome/public/api/reviews/${teach}`
      );
      setData(response.data.data.reviews);
    } catch (error) {
      setError(error.message);
    }
  }
  async function inputData() {
    try {
      let response = await axios.post(
        `https://yousab-tech.com/unihome/public/api/auth/review`,
        inputComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrueSendComment(true);
    } catch (error) {
      setError(error);
    }
    if (error) {
      return <p>{error.message}</p>;
    }
  }
  function registerComment(e) {
    let inputreviews = { ...inputComment };
    inputreviews[e?.target.name] = e.target.value;
    setInputComment(inputreviews);
  }

  function handleReview(e) {
    e.preventDefault();
    inputData();
  }
  function handleStarClick(ratingValue) {
    setRating(ratingValue);
    setInputComment({ ...inputComment, rate: ratingValue });
  }
  function starRating(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "star filled" : "star "}>
          ★
        </span>
      );
    }
    return <div className="star-rating">{stars}</div>;
  }
  return (
    <>
      <section className="reviews">
        <div>
          <h1 className="mt-5 mb-4 text-3xl font-semibold text-black">{t("Reviews")}</h1>
        </div>
        {data && data.length > 0 ? (
          <div className="overflow-y-scroll h-screen p-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="mt-5 flex justify-between items-start p-5 bg-gray-100 shadow-lg rounded-3xl hover:shadow-xl transition duration-300 ease-in-out"
              >
                {/* User Info and Rating */}
                <div className="flex gap-4 items-center">
                  {/* User Icon */}
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={item.student.image || userCommentIcon} alt="User Comment Icon" className="w-full h-full object-cover" />
                  </div>

                  {/* User Name and Date */}
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-800">
                      {item.student.firstname + " " + item.student.lastname}
                    </span>
                    <span className="text-sm text-gray-500">{item.created_at.split("T")[0]}</span>

                    {/* Rating */}
                    <div className="flex items-center mt-2">
                      <span className="px-3 py-1 font-bold text-white bg-yellow-500 rounded-full mr-2">
                        {`${item.rate}.0`}
                      </span>
                      {starRating(item.rate)}
                    </div>
                  </div>
                </div>

                {/* User Comment */}
                <div className="ml-8 w-full max-w-xl">
                  <p className="text-base text-gray-700 leading-relaxed border-l-4 pl-4 border-yellow-400">
                    {item.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>

        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="max-w-md text-center p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">No Reviews Yet</h2>
                <p className="text-sm md:text-base text-gray-600 mb-6">Be the first to leave a review and share your experience!</p>
                <img src={rate} alt="No reviews illustration" className="w-3/4 md:w-1/2 mx-auto mb-4 rounded-lg shadow-sm" />
              </div>
            </div>
          </>
        )}

        {user.type === "student" && (
          <form onSubmit={handleReview} className="mt-5 bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
            <input
              type="text"
              className="p-3 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full md:w-3/4 mb-4 md:mb-0 transition duration-300 ease-in-out hover:shadow-md"
              placeholder={t("Type your text here")}
              name="comment"
              value={inputComment.comment}
              onChange={registerComment}
              required
            />

            <div className="flex items-center space-x-2 md:mx-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => handleStarClick(i + 1)}
                  style={{
                    cursor: "pointer",
                    fontSize: "32px",
                    color: i < rating ? "#FFD700" : "#B0B0B0", // Gold and Gray colors
                  }}
                  className="transition duration-200 ease-in-out transform hover:scale-125"
                >
                  ★
                </span>
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300 ease-in-out shadow-md"
            >
              {t("Send")}
            </button>
          </form>

        )}
      </section>
    </>
  );
}
