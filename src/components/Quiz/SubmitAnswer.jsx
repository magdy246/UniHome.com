import React, { useState, useEffect } from "react";
import axios from "axios";

import comment from "../../images/comment-icon.png";
import toast from "react-hot-toast";

export default function SubmitAnswer() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("https://yousab-tech.com/unihome/public/api/quizs");
      const sortedQuizzes = response?.data?.data?.quizs.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setQuizzes(sortedQuizzes || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedAnswers({});
  };

  const handleAnswerChange = (questionId, choiceId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choiceId,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      const submissionData = {
        testings: Object.keys(selectedAnswers).map((questionId) => ({
          student_id: 1,
          quiz_id: selectedQuiz.id,
          question_id: parseInt(questionId),
          answer_id: selectedAnswers[questionId],
        })),
      };

      const response = await axios.post(
        "https://yousab-tech.com/unihome/public/api/testing",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("the answers already Submited.")

    } catch (error) {
      toast.error("the answers are not Submited.")
      console.error("Error submitting exam:", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl p-6 bg-gray-100 rounded-3xl">
      <h2 className="text-6xl font-light font-[Jomhuria-R]">
        Quizzes :
      </h2>
      {!selectedQuiz ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all relative"
              onClick={() => handleQuizSelect(quiz)}
            >
              {/* Image behind the title */}
              <img
                src={comment}
                alt="comment icon"
                className="absolute top-2 right-2 w-20 h-20 opacity-20"
              />
              <h3 className="text-xl font-semibold mb-2 relative">
                Quiz {index + 1}: {quiz.title}
              </h3>
              <p className="text-gray-600">
                Date: {new Date(quiz.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl p-6">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-3xl"
          >
            Back to Quizzes
          </button>
          <h2 className="text-6xl font-light font-[Jomhuria-R] mb-6">
            {selectedQuiz.title}
          </h2>
          {selectedQuiz?.questions?.map((question, index) => (
            <div key={question.id} className="py-4">
              <div className="w-full md:w-[550px] lg:w-[750px] xl:w-[900px]">
                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-md p-6 mb-5">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={comment}
                        alt="comment icon"
                        className="w-6 h-6"
                      />
                      <h4 className="text-lg font-semibold">
                        Question {index + 1}
                      </h4>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">
                    {question.title.trim().endsWith("?")
                      ? question.title
                      : `${question.title}?`}
                  </p>

                  <div className="space-y-2">
                    {question.answers.map((choice, choiceIndex) => (
                      <div
                        key={choice.id}
                        className={`border-2 border-gray-300 rounded-3xl flex justify-between items-center cursor-pointer transition-all duration-300 ${selectedAnswers[question.id] === choice.id
                          ? "bg-blue-600 border-blue-500 text-white"
                          : ""
                          } hover:bg-blue-400 hover:border-blue-500 active:bg-blue-700`}
                        onClick={() =>
                          handleAnswerChange(question.id, choice.id)
                        }
                      >
                        <span className="p-3 border-e-2">
                          {String.fromCharCode(65 + choiceIndex)}
                        </span>
                        <p className="flex-grow px-4">{choice.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-3xl"
          >
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
}
