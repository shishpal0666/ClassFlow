import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import AuthRedirect from "./AuthRedirect";
import { RefreshCcw } from "lucide-react"; // optional icon library

const ViewQA = () => {
  const { quesCode } = useParams();
  const [qaData, setQaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const user = useSelector((store) => store.user);

  const fetchQA = async () => {
    try {
      setRefreshing(true);
      const res = await axios.get(`${SERVER_URL}/question/${quesCode}`, {
        withCredentials: true,
      });
      setQaData(res?.data?.data);
      setRefreshing(false);
      setLoading(false);
    } catch (err) {
      console.error(
        "Error during question fetch:",
        err.response?.data || err.message
      );
      setError("Failed to load question and answers");
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQA();
  }, [quesCode]);

  if (!user) return <AuthRedirect />;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg flex items-center">
          <span className="material-icons mr-2">error_outline</span>
          {error}
        </div>
      </div>
    );

  if (!qaData) return null;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <QuestionCard quesCode={quesCode} question={qaData?.question} />

        <div className="flex flex-col p-4 bg-gray-800 border-2 border-gray-700 rounded-lg mb-8 transition-all">
          <div className="flex flex-row items-center mb-4 justify-between bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md">
            <span className="font-semibold text-lg">Answers</span>

            <div className="flex items-center gap-3">
              <div className="bg-amber-400 text-black font-bold px-4 py-2 rounded-full shadow-lg">
                {qaData?.answers?.length}
              </div>
              <button
                onClick={fetchQA}
                className="text-white hover:text-yellow-300 transition duration-200"
                title="Reload answers"
              >
                {refreshing ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4.05 11a9 9 0 0115.32-3.36L22 4m0 0v6h-6"></path>
                    <path d="M19.95 13a9 9 0 01-15.32 3.36L2 20m0 0v-6h6"></path>
                  </svg>
                ) : (
                  <RefreshCcw className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="border-2 mb-6 border-gray-700"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qaData?.answers?.map((answer, index) => (
              <AnswerCard key={index} answer={answer} index={index} />
            ))}
          </div>
        </div>

        {(!qaData?.answers || qaData.answers.length === 0) && (
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <p className="text-gray-400 text-lg">
              No answers available for this question.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewQA;
