import React, { useEffect, useState, useRef, useCallback } from "react";
import socket from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import QuestionCard from "./QuestionCard";
import AnswerCard from "./AnswerCard";
import AuthRedirect from "./AuthRedirect";

// Spinner component
const Spinner = ({ text }) => (
  <div className="flex justify-center py-8">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mx-auto mb-3"></div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  </div>
);

// Header component
const Header = ({ answerCount }) => (
  <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-3 rounded-lg mb-6">
    <span className="font-semibold text-lg">Answers</span>
    <span className="bg-amber-400 text-black font-bold px-4 py-2 rounded-full">
      {answerCount}
    </span>
  </div>
);

// Empty answers component
const EmptyAnswers = () => (
  <div className="text-center text-gray-400 py-12">
    <div className="mb-4">
      <svg className="mx-auto h-16 w-16 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </div>
    <p className="text-lg font-medium">No answers yet</p>
    <p className="text-sm mt-2">Be the first to answer this question!</p>
  </div>
);

// Error box component
const ErrorBox = ({ error, onRetry }) => (
  <div className="bg-red-600/20 border border-red-600 text-red-400 p-4 rounded-lg mt-4">
    <p className="font-medium">Error loading answers</p>
    <p className="text-sm mt-1">{error}</p>
    <button
      onClick={onRetry}
      className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Loading screen
const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const ANSWERS_LIMIT = 10;

const ViewQA = () => {
  const { quesCode } = useParams();
  const user = useSelector((store) => store.user);

  const [qaData, setQaData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [answersLoading, setAnswersLoading] = useState(false);
  const [initialAnswersLoad, setInitialAnswersLoad] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchQuestion = async () => {
    try {
      setLoadingQuestion(true);
      const res = await axios.get(`${SERVER_URL}/question/view/${quesCode}`, {
        withCredentials: true,
      });
      console.log(quesCode);
      setQaData(res?.data?.data?.question || null);
      setLoadingQuestion(false);
    } catch {
      setError("Failed to load question");
      setLoadingQuestion(false);
    }
  };

  const fetchAnswers = async (pageNum = 1, isInitial = false) => {
    try {
      if (isInitial) setInitialAnswersLoad(true);
      else setAnswersLoading(true);

      const res = await axios.get(
        `${SERVER_URL}/question/view/${quesCode}?includeAnswers=true&page=${pageNum}&limit=${ANSWERS_LIMIT}`,
        { withCredentials: true }
      );

      const newAnswers = res?.data?.data?.answers || [];
      setAnswers((prev) => (pageNum === 1 ? newAnswers : [...prev, ...newAnswers]));
      setHasMore(newAnswers.length === ANSWERS_LIMIT);
    } catch {
      setError("Unable to load answers. Please try again.");
    } finally {
      if (isInitial) setInitialAnswersLoad(false);
      else setAnswersLoading(false);
    }
  };

  // Initial load/reset only on quesCode change
  useEffect(() => {
    fetchQuestion();
    setAnswers([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [quesCode]);

  // Socket event: only add answer, do not reset or reload
  useEffect(() => {
    const handleNewAnswer = (data) => {
      if (data?.answer?.quesCode === quesCode) {
        setAnswers((prev) => [data.answer, ...prev]);
        setQaData((prev) => prev ? { ...prev, answerCount: (prev.answerCount || 0) + 1 } : prev);
      }
    };
    socket.on('newAnswer', handleNewAnswer);
    return () => {
      socket.off('newAnswer', handleNewAnswer);
    };
  }, [quesCode]);

  // Only fetch answers on initial question load, not on every qaData change
  useEffect(() => {
    if (qaData && answers.length === 0) {
      fetchAnswers(1, true);
    }
    // eslint-disable-next-line
  }, [qaData]);

  useEffect(() => {
    if (page > 1) {
      fetchAnswers(page);
    }
  }, [page]);

  const lastAnswerRef = useCallback(
    (node) => {
      if (answersLoading || initialAnswersLoad) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        {
          threshold: 1.0,
          rootMargin: "100px",
        }
      );

      if (node) observer.current.observe(node);
    },
    [answersLoading, hasMore, initialAnswersLoad]
  );

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  if (!user) return <AuthRedirect />;
  if (loadingQuestion) return <LoadingScreen />;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <QuestionCard {...qaData} />

        <div className="flex flex-col p-4 bg-gray-800 border-2 border-gray-700 rounded-lg mb-8">
          <Header answerCount={qaData?.answerCount || answers.length} />

          {initialAnswersLoad ? (
            <Spinner text="Loading answers..." />
          ) : (
            <>
              <div className="flex flex-col gap-6">
                {answers.map((answer, index) => {
                  const isLast = index === answers.length - 1;
                  return (
                    <AnswerCard
                      key={answer._id || `${answer.answer}-${index}`}
                      answer={answer}
                      ref={isLast ? lastAnswerRef : undefined}
                    />
                  );
                })}
              </div>

              {answersLoading && <Spinner text="Loading more answers..." />}

              {!hasMore && answers.length > 0 && (
                <p className="text-center text-gray-500 py-6 border-t border-gray-700 mt-6">
                  You've reached the end of all answers
                </p>
              )}

              {!answersLoading && !initialAnswersLoad && answers.length === 0 && <EmptyAnswers />}
            </>
          )}

          {error && qaData && <ErrorBox error={error} onRetry={() => fetchAnswers(1, true)} />}
        </div>
      </div>
    </div>
  );
};

export default ViewQA;
