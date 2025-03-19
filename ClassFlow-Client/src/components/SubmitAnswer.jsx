import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import AuthRedirect from "./AuthRedirect";
import QuestionCard from "./QuestionCard";
import Toast from "./Toast";

const SubmitAnswer = () => {
  const { quesCode } = useParams();
  const [question, setQuestion] = useState("");
  const user = useSelector((store) => store.user);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);

  const fetchQues = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/question/view/${quesCode}`,
        {
          withCredentials: true,
        }
      );
      setQuestion(response?.data?.data?.question?.question);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  
  useEffect(() => {
    fetchQues();
  }); 

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!user) return <AuthRedirect />;

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleClear = () => {
    setAnswer("");
    if (textAreaRef.current) textAreaRef.current.style.height = "auto";
    setError("");
  };

  const handleCreateAnswer = async () => {
    setError("");
    if (!answer.trim()) {
      setError("Answer cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${SERVER_URL}/answer/submit`,
        { answer, quesCode },
        { withCredentials: true }
      );

      setShowToast(true);
    } catch (err) {
      console.error(
        "Error during answer creation:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow items-center p-6 bg-gray-900">
      {showToast && (
        <Toast message="Answer submitted successfully!" type="success" />
      )}
      {error && <Toast message={error} type="error" />}

      <div className="w-full mt-10 max-w-3xl">
        <QuestionCard quesCode={quesCode} question={question} />
      </div>

      <div className="w-full mt-10 max-w-3xl">
        <textarea
          ref={textAreaRef}
          placeholder="What is your answer?"
          value={answer}
          onChange={handleInputChange}
          rows={4}
          cols={60}
          className="w-full p-6 text-xl rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
        />
      </div>

      <div className="mt-6 w-full max-w-3xl flex justify-between gap-4">
        <button
          onClick={handleCreateAnswer}
          disabled={loading || !answer.trim()}
          className={`w-auto px-2 py-3 ${
            loading || !answer.trim()
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white text-lg font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="none"
                  d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"
                ></path>
              </svg>
              Creating...
            </div>
          ) : (
            "Submit Answer"
          )}
        </button>
        <button
          onClick={handleClear}
          className="w-auto px-6 py-3 bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SubmitAnswer;
