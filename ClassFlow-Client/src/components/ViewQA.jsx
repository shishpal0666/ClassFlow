import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import AuthRedirect from "./AuthRedirect";

const ViewQA = () => {
  const { quesCode } = useParams();
  const [qaData, setQaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    const fetchQA = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${SERVER_URL}/question/${quesCode}`, {
          withCredentials: true,
        });
        setQaData(res?.data?.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Error during question fetch:",
          err.response?.data || err.message
        );
        setError("Failed to load question and answers");
        setLoading(false);
      }
    };
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
            <div className="bg-amber-400 text-black font-bold px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105">
              {qaData?.answers?.length}
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
