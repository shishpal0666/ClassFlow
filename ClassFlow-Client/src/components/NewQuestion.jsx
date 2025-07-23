import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import AuthRedirect from "./AuthRedirect";
import Toast from "./Toast";


const NewQuestion = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadline, setDeadline] = useState("");
  const textAreaRef = useRef(null);

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
    setQuestion(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleClear = () => {
    setQuestion("");
    if (textAreaRef.current) textAreaRef.current.style.height = "auto";
    setError("");
  };

  const handleCreateQuestion = async () => {
    setError("");
    if (!question.trim()) {
      setError("Question cannot be empty!");
      return;
    }
    if (hasDeadline && !deadline) {
      setError("Please select a deadline or disable the time constraint.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${SERVER_URL}/question/create`,
        { question, answerDeadline: hasDeadline ? deadline : null },
        { withCredentials: true }
      );

      setShowToast(true);
      setTimeout(() => {
        navigate(`/question/view/${res?.data?.question?.quesCode}`);
      }, 1000);
    } catch (err) {
      console.error("Error during question creation:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow items-center p-6 bg-gray-900">
      {showToast && <Toast message="Question created successfully!" type="success" />}
      {error && <Toast message={error} type="error" />}

      <div className="w-full mt-10 max-w-3xl">
        <textarea
          ref={textAreaRef}
          placeholder="What is your Question?"
          value={question}
          onChange={handleInputChange}
          rows={4}
          cols={60}
          className="w-full p-6 text-xl rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
        />
        <div className="mt-6 flex items-center gap-4">
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={hasDeadline}
              onChange={e => setHasDeadline(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            Set answer time limit
          </label>
          {hasDeadline && (
            <input
              type="datetime-local"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="ml-4 p-2 rounded bg-gray-700 text-white border border-gray-600"
              min={new Date().toISOString().slice(0, 16)}
            />
          )}
        </div>
        {hasDeadline && deadline && (
          <div className="text-sm text-gray-400 mt-2">
            Answers will be accepted until: {new Date(deadline).toLocaleString()}
          </div>
        )}
      </div>

      <div className="mt-6 w-full max-w-3xl flex justify-between gap-4">
        <button
          onClick={handleCreateQuestion}
          disabled={loading || !question.trim()}
          className={`w-auto px-2 py-3 ${loading || !question.trim() ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white text-lg font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
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
                <path className="opacity-75" fill="none" d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z"></path>
              </svg>
              Creating...
            </div>
          ) : (
            "Create Question"
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

export default NewQuestion;
