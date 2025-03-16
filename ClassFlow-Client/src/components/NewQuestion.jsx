import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const NewQuestion = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleClear = () => {
    setQuestion("");
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }
    setError("");
  };

  const handleCreateQuestion = async () => {
    setError("");
    if (!question.trim()) {
      setError("Question cannot be empty!");
      return;
    }

    // Set loading state to true when request starts
    setLoading(true);

    try {
      const res = await axios.post(
        `${SERVER_URL}/question/create`,
        {
          question: question,
        },
        {
          withCredentials: true,
        }
      );

      setShowToast(true);
      setTimeout(() => {
        navigate(`/question/${res?.data?.question?.quesCode}`);
      }, 1000);
    } catch (err) {
      console.error("Error during question creation:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      // Reset loading state after request finishes
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10 min-h-screen p-6 bg-gray-900">
      {showToast && (
        <div className="fixed top-22 left-1/2 transform -translate-x-1/2 z-50 w-auto min-w-min">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-lg shadow-md">
            <span className="font-medium">Question created successfully!</span>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-22 left-1/2 transform -translate-x-1/2 z-50 w-auto min-w-min">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-lg shadow-md">
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      <div className="w-full mt-10 max-w-3xl">
        <textarea
          ref={textAreaRef}
          placeholder="What is your Question?"
          value={question}
          onChange={handleInputChange}
          rows={2}
          className="w-full p-4 text-lg rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
        />
      </div>
      <div className="mt-6 w-full max-w-3xl flex justify-center gap-4">
        <button
          onClick={handleCreateQuestion}
          disabled={loading || !question.trim()}
          className={`w-full md:w-auto px-8 py-4 ${
            loading || !question.trim() 
              ? "bg-blue-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700"
          } text-white text-xl font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
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
                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="none"
                  d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"
                ></path>
              </svg>
              Creating...
            </div>
          ) : (
            "Create Question"
          )}
        </button>
        <button
          onClick={handleClear}
          className="w-full md:w-auto px-8 py-4 bg-gray-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default NewQuestion;
