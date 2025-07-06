import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../utils/constants";
import QuestionCard from "./QuestionCard";

const QuestionHistory = () => {
  const user = useSelector((store) => store.user);
  const [questions, setQuestions] = useState([]);
  const [qPage, setQPage] = useState(1);
  const [qTotalPages, setQTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    if (!user) return;
    fetchQuestions(qPage);
  }, [user, qPage]);

  const fetchQuestions = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${SERVER_URL}/user/history/questions?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setQuestions(res.data.questions);
      setQTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Questions You Asked</h2>
      {loading ? (
        <p className="text-center text-gray-300 animate-pulse">Loading questions...</p>
      ) : questions.length === 0 ? (
        <p className="text-center text-gray-300">No questions found.</p>
      ) : (
        questions.map((q) => (
          <QuestionCard
            key={q._id}
            quesCode={q.quesCode}
            question={q.question}
            createdAt={q.createdAt}
            updatedAt={q.updatedAt}
          />
        ))
      )}

      {questions.length > 0 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setQPage((p) => Math.max(1, p - 1))}
            disabled={qPage === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-lg">Page {qPage} of {qTotalPages}</span>
          <button
            onClick={() => setQPage((p) => Math.min(qTotalPages, p + 1))}
            disabled={qPage === qTotalPages}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionHistory;
