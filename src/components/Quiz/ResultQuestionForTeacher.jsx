import React, { useState, useEffect } from "react";
import axios from "axios";
import commentIcon from "../../images/comment-icon.png";
import { useTranslation } from "react-i18next";

export default function ResultQuestionForTeacher() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [results, setResults] = useState([]);
  const [sum, setSum] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch the list of quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true); // Start loading
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
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchQuizzes();
  }, []);

  // Fetch results for a specific quiz when a quiz card is clicked
  const handleQuizSelect = async (quiz) => {
    setSelectedQuiz(quiz);
    const id_Quiz = quiz.id;

    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://yousab-tech.com/unihome/public/api/testings/quiz/${id_Quiz}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(response?.data?.data?.testings);
    } catch (error) {
      console.error("Error fetching results for quiz:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Calculate sum of correct answers when results change
  useEffect(() => {
    if (results.length > 0) {
      const totalCorrectAnswers = results.reduce(
        (acc, result) => acc + (result?.result || 0),
        0
      );
      setSum(totalCorrectAnswers);
    }
  }, [results]);

  // Filter out duplicate student IDs
  const uniqueResults = [];
  const seenIds = new Set();

  results.forEach((result) => {
    if (!seenIds.has(result.student.id)) {
      uniqueResults.push(result);
      seenIds.add(result.student.id);
    }
  });
  const { t } = useTranslation();


  return (
    <>
          <h1 className="text-center text-6xl font-bold text-white my-6 relative">
        <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">{t("Result")}</span>
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
      </h1>
    <div className="mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl p-6 bg-gray-100 rounded-3xl">
      <h2 className="text-6xl font-light font-[Jomhuria-R]">
        Result :
      </h2>
      {loading ? ( // Loading indicator
        <div className="flex items-center justify-center h-64">
          <span className="text-lg">Loading...</span>
        </div>
      ) : !selectedQuiz ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Display the list of quizzes as cards */}
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
          {/* Display the list of students who solved the quiz in a table */}
          {uniqueResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-center">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500 to-blue-500 text-white">
                    <th className="py-3 px-5 text-lg font-semibold">Student Name</th>
                    <th className="py-3 px-5 text-lg font-semibold">Student ID</th>
                    <th className="py-3 px-5 text-lg font-semibold">Correct Answers</th>
                    <th className="py-3 px-5 text-lg font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueResults?.map((result, index) => {
                    const isPass = sum > 0; // Assuming `sum` holds the score for the student.
                    return (
                      <tr key={index} className="bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-300 font-bold">
                        <td className="py-3 px-5 border-t border-gray-200 text-gray-700">{result.student.firstname}</td>
                        <td className="py-3 px-5 border-t border-gray-200 text-gray-700">{result.student.id}</td>
                        <td className="py-3 px-5 border-t border-gray-200 text-gray-700">
                          {sum}/{results.length}
                        </td>
                        <td className={`py-3 px-5 border-t border-gray-200 ${isPass ? 'text-green-500' : 'text-red-500'}`}>
                          {isPass ? 'Pass' : 'Fail'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-red-500">No results found for this quiz.</p>
          )}
        </div>
      )}
    </div>
    </>
  );
}
