import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const PAGE_LIMIT = 10;

const QuestionHistory = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${SERVER_URL}/user/questions?page=${page}&limit=${PAGE_LIMIT}`,
          { withCredentials: true }
        );
        setQuestions(res.data.data.questions || []);
        setTotal(res.data.data.total || 0);
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions.");
        setLoading(false);
        console.error(err);
      }
    };
    fetchQuestions();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_LIMIT);

  if (loading) return <div className="text-center py-8 text-white">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {questions.map((q) => (
          <div key={q.quesCode} className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="text-white font-semibold">{q.question}</div>
              <div className="text-xs text-gray-400">Asked: {new Date(q.createdAt).toLocaleString()}</div>
              <div className="text-xs text-gray-400">Answers: {q.answerCount}</div>
            </div>
            <NavLink
              to={`/question/view/${q.quesCode}`}
              className="mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition text-center"
            >
              View Details
            </NavLink>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
        >
          Back
        </button>
        <span className="px-4 py-2 text-white">{page} / {totalPages}</span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionHistory;