import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import commentIcon from "../../images/comment-icon.png";

export default function ResultQuestionForStudent() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("https://yousab-tech.com/unihome/public/api/quizs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data.data.quizs);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = async (quiz) => {
    setSelectedQuiz(quiz);
    const id_Quiz = quiz.id;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`https://yousab-tech.com/unihome/public/api/testings/${id_Quiz}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(response?.data?.data?.testings);
    } catch (error) {
      console.error("Error fetching results for quiz:", error);
    }
  };

  return (
    <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl p-6 bg-gray-100 rounded-3xl">
      <h2 className="text-6xl font-light font-[Jomhuria-R]">
        Result :
      </h2>
      {!selectedQuiz ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes?.map((quiz, index) => (
            <div
              key={quiz.id}
              className="bg-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all relative"
              onClick={() => handleQuizSelect(quiz)}
            >
              <img
                src={commentIcon}
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
            {selectedQuiz?.title}
          </h2>
          {results?.map((result, index) => (
            <div key={index} className="py-4">
              <div className="w-full max-w-4xl bg-white rounded-3xl shadow-md p-6 mb-5">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <img src={commentIcon} alt="comment icon" className="w-6 h-6" />
                    <h4 className="text-lg font-semibold">Question {index + 1}</h4>
                  </div>
                  {result && (
                    <div className="flex items-center space-x-2">
                      {result.answer.correct === 1 ? (
                        <>
                          <FaCheck className="text-green-500" />
                          <span className="text-green-500 font-bold">1/1 points</span>
                        </>
                      ) : (
                        <>
                          <FaTimes className="text-red-500" />
                          <span className="text-red-500 font-bold">0/1 points</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{result.question.title}</p>
                <div className="space-y-2">
                  {result.question.answers
                    .sort((a, b) => a.title.localeCompare(b.title)) // Sort answers alphabetically by title
                    .map((answer, index) => {
                      const isChosen = answer.id === result.answer.id; // Check if this answer was chosen
                      const isCorrect = answer.correct === 1; // Check if this is the correct answer

                      // Find the actual correct answer from the result
                      const realCorrectAnswer = result.questionAnswers.find((questionAnswer) => questionAnswer.correct === 1);

                      const choiceLabel = String.fromCharCode(65 + index);

                      return (
                        <div
                          key={answer.id}
                          className={`border-2 rounded-md flex justify-start items-center 
                              ${isChosen
                              ? isCorrect
                                ? "border-green-500 bg-green-50" // Highlight chosen correct answer in green
                                : "border-red-500 bg-red-50" // Highlight chosen incorrect answer in red
                              : answer.id === realCorrectAnswer.id
                                ? "border-green-500 bg-green-50" // Highlight the actual correct answer if not chosen
                                : "border-gray-300" // Neutral for unchosen and incorrect answers
                            }`}
                        >
                          <span className="p-3 border-e-2">{choiceLabel}.</span>
                          <span className="ps-3">{answer.title}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}
