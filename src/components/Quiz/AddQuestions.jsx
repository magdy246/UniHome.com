import React, { useState } from "react";
import axios from "axios";
import comment from "../../images/comment-icon.png";
import { FaMinus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

export default function AddQuestions() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      choices: [{ label: "A", text: "" }],
      correctChoice: "",
    },
  ]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (questionIndex, choiceIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices[choiceIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectChoiceChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].correctChoice = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        choices: [{ label: "A", text: "" }],
        correctChoice: "",
      },
    ]);
  };

  const addChoice = (questionIndex) => {
    const newQuestions = [...questions];
    const lastLabel = newQuestions[questionIndex].choices.slice(-1)[0].label;
    const newLabel = String.fromCharCode(lastLabel.charCodeAt(0) + 1);
    newQuestions[questionIndex].choices.push({ label: newLabel, text: "" });
    setQuestions(newQuestions);
  };

  const deleteChoice = (questionIndex, choiceIndex) => {
    if (choiceIndex === 0) {
      return;
    }
    const newQuestions = [...questions];
    newQuestions[questionIndex].choices.splice(choiceIndex, 1);
    setQuestions(newQuestions);
  };

  const deleteQuestion = (questionIndex) => {
    if (questions.length <= 1) {
      return;
    }
    const newQuestions = questions.filter((_, index) => index !== questionIndex);
    setQuestions(newQuestions);
  };

  async function handleSubmit() {
    try {
      const payload = {
        title: quizTitle,
        questions: questions?.map((question) => ({
          title: question?.questionText,
          score: 5,
          answers: question?.choices?.map((choice) => ({
            title: choice.text,
            correct: question?.correctChoice === choice.label ? 1 : 0,
          })),
        })),
      };

      const response = await axios.post(
        "https://yousab-tech.com/unihome/public/api/quiz",
        payload
      );


      const data = Array.isArray(response?.data) ? response.data : [];
      setQuestions(data);
      toast.success("Questions already sending.")

      return response;
    } catch (error) {
      console.error("Error adding questions:", error);
      toast.error("Questions are not sending.")
      return error;
    }
  }

  const { t } = useTranslation();


  return (<>
    <h1 className="text-center text-6xl font-bold text-white my-6 relative" dir="ltr">
      <span className="bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">Create Quiz</span>
      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-blue-500"></span>
    </h1>
    <div className="container mx-auto max-w-lg sm:max-w-xl lg:max-w-4xl p-6">
      <div className="w-full md:w-[550px] lg:w-[750px] xl:w-[900px]">
        <div className="mb-6">
          <h2 className="text-6xl font-light font-[Jomhuria-R]">
            Add Questions :
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Quiz Name:</label>
          <input
            type="text"
            placeholder="Enter quiz name"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="text-gray-700 mb-4 p-2 w-full border-black border-2 rounded-3xl"
          />
        </div>

        {questions?.map((question, questionIndex) => (
          <div key={questionIndex} className="py-4">
            <div className="w-full max-w-7xl bg-white rounded-3xl shadow-md p-6 mb-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <img src={comment} alt="comment icon" className="w-6 h-6" />
                  <h4 className="text-lg font-semibold">
                    Question {questionIndex + 1}
                  </h4>
                </div>
                {questionIndex !== 0 && (
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-3xl"
                    onClick={() => deleteQuestion(questionIndex)}
                  >
                    Delete
                  </button>
                )}
              </div>

              <textarea
                placeholder="Add your question here..."
                className="text-gray-700 mb-4 p-2 w-full border-black border-2 rounded-3xl"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(questionIndex, e)}
              />

              <div className="space-y-2">
                {question?.choices?.map((choice, choiceIndex) => (
                  <div
                    key={choice.label}
                    className="relative border-2 border-gray-300 rounded-3xl flex justify-between items-center mb-2"
                  >
                    <span className="p-3 border-e-2">{choice.label}</span>
                    <textarea
                      placeholder="Add your answer here..."
                      className="flex-grow px-2 border-black border-2 rounded-e-3xl"
                      value={choice.text}
                      onChange={(e) =>
                        handleChoiceChange(questionIndex, choiceIndex, e)
                      }
                    />
                    {choiceIndex !== 0 && (
                      <button
                        className="absolute end-0 -translate-x-1/3 px-1 py-1 rounded-full bg-red-500 text-white ml-2"
                        onClick={() => deleteChoice(questionIndex, choiceIndex)}
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => addChoice(questionIndex)}
                className="px-4 py-2 bg-orange-500 text-white rounded-3xl mb-4 mt-2"
              >
                Add Answer
              </button>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Correct Choice:
                </label>
                <select
                  className="p-2 border-black border-2 rounded-3xl"
                  value={question.correctChoice}
                  onChange={(e) => handleCorrectChoiceChange(questionIndex, e)}
                >
                  <option value="">Select Correct Choice</option>
                  {question?.choices?.map((choice) => (
                    <option key={choice.label} value={choice.label}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        <div className="flex md:flex-row flex-col md:justify-between items-center">
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded-3xl mb-4 md:mb-0"
          >
            Add Another Question
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-3xl"
          >
            Add Questions
          </button>
        </div>
      </div>
    </div>
  </>
  );
}
