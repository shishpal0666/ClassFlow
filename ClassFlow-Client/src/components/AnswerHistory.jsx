import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_URL } from "../utils/constants";
import AnswerCard from "./AnswerCard";

const AnswerHistory = () => {
  const user = useSelector((store) => store.user);
  const [answers, setAnswers] = useState([]);
  const [aPage, setAPage] = useState(1);
  const [aTotalPages, setATotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    if (!user) return;
    fetchAnswers(aPage);
  }, [user, aPage]);

  const fetchAnswers = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${SERVER_URL}/user/history/answers?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setAnswers(res.data.answers);
      setATotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching answers:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Answers You Submitted</h2>
      {loading ? (
        <p className="text-center text-gray-300 animate-pulse">Loading answers...</p>
      ) : answers.length === 0 ? (
        <p className="text-center text-gray-300">No answers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {answers.map((ans, index) => (
            <AnswerCard
              key={ans.answerId || index}
              answer={ans.answer}
              index={index}
              quesCode={ans.quesCode}
              question={ans.question}
              submittedAt={ans.submittedAt}
            />
          ))}
        </div>
      )}

      {answers.length > 0 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setAPage((p) => Math.max(1, p - 1))}
            disabled={aPage === 1}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-lg">Page {aPage} of {aTotalPages}</span>
          <button
            onClick={() => setAPage((p) => Math.min(aTotalPages, p + 1))}
            disabled={aPage === aTotalPages}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AnswerHistory;
