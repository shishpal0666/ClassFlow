import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const PAGE_LIMIT = 10;

const AnswerHistory = () => {
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${SERVER_URL}/user/answers?page=${page}&limit=${PAGE_LIMIT}`,
          { withCredentials: true }
        );
        setAnswers(res.data.data.answers || []);
        setTotal(res.data.data.total || 0);
        setLoading(false);
      } catch (err) {
        setError("Failed to load answers.");
        setLoading(false);
        console.error(err);
      }
    };
    fetchAnswers();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_LIMIT);

  if (loading) return <div className="text-center py-8 text-white">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex flex-col gap-4">
        {answers.map((a, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg">
            <div className="text-white font-semibold">{a.answer}</div>
            <div className="text-xs text-gray-400">Answered: {new Date(a.createdAt).toLocaleString()}</div>
            <div className="text-xs text-gray-400">Question Code: {a.quesCode}</div>
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

export default AnswerHistory;
