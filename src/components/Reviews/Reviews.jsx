import React, { useEffect, useState } from "react";
import userCommentIcon from "../Assets/images/user comment.com.png";
import "./Reviews.css";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

export default function Reviews(teacher) {
  const { t } = useTranslation();

  const token = Cookies.get("accessToken");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [trueSendComment, setTrueSendComment] = useState(false);
  const [rating, setRating] = useState(0);
  let teach = teacher.teacher;
  let user = JSON.parse(sessionStorage.getItem("user"));

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
      console.log(response.data.data.reviews);
      toast.success("success")
    } catch (error) {
      setError(error.message);
      toast.error("field")
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
        <div className="overflow-y-scroll h-screen">
          {data.map((item, index) => (
            <div
              key={index}
              className="mt-5 flex justify-between items-start p-5 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              {/* User Info and Rating */}
              <div className="flex gap-4 items-center">
                {/* User Icon */}
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={userCommentIcon} alt="User Comment Icon" className="w-full h-full object-cover" />
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

        {user.type === "student" && (
          <form onSubmit={handleReview} className="mt-5 d-flex">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder={t("Type your text here")}
              name="comment"
              value={inputComment.comment}
              onChange={registerComment}
              required
            />
            <div className="mx-2 selectLevelReview">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => handleStarClick(i + 1)}
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    color: i < rating ? "gold" : "gray",
                  }}
                  className="mx-2"
                >
                  ★
                </span>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              {t("Send")}
            </button>
          </form>
        )}
      </section>
    </>
  );
}
