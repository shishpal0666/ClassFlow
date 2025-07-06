import React, { useState } from "react";
import QuestionHistory from "./QuestionHistory";
import AnswerHistory from "./AnswerHistory";

const History = () => {
  const [view, setView] = useState("questions");

  return (
    <div className="mt-10 bg-gray-600 p-6 sm:p-8 rounded-lg shadow-md">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setView("questions")}
          className={`px-4 py-2 mx-2 rounded-lg ${
            view === "questions"
              ? "bg-blue-600 text-white"
              : "bg-gray-500 text-gray-200 hover:bg-blue-500"
          } transition`}
        >
          Your Questions
        </button>
        <button
          onClick={() => setView("answers")}
          className={`px-4 py-2 mx-2 rounded-lg ${
            view === "answers"
              ? "bg-green-600 text-white"
              : "bg-gray-500 text-gray-200 hover:bg-green-500"
          } transition`}
        >
          Your Answers
        </button>
      </div>

      {view === "questions" ? <QuestionHistory /> : <AnswerHistory />}
    </div>
  );
};

export default History;
