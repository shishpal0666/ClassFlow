import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const QuestionCard = ({ quesCode, question, createdAt, updatedAt, answerCount, answerDeadline }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const user = useSelector((store) => store.user);

  
  useEffect(() => {
    return () => {
      setCopySuccess(false);
    };
  }, []);
  
  if (!user) return( <AuthRedirect />);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(quesCode)
      .then(() => {
        setCopySuccess(true);
        const timeoutId = setTimeout(() => {
          setCopySuccess(false);
        }, 2000);

        return () => clearTimeout(timeoutId);
      })
      .catch(() => setCopySuccess(false));
  };

  const askedDate =
    createdAt && !isNaN(new Date(createdAt).getTime())
      ? new Date(createdAt).toLocaleString()
      : "N/A";
  const updatedDate =
    updatedAt && !isNaN(new Date(updatedAt).getTime())
      ? new Date(updatedAt).toLocaleString()
      : null;

  return (
    <div className="bg-base-200 p-4 sm:p-6 rounded-xl mb-6 shadow-lg border border-base-300 max-w-2xl mx-auto w-full">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="badge badge-primary text-xs font-semibold">Question</span>
        <span className="badge badge-outline text-xs font-mono select-all">{quesCode}</span>
        <button
          onClick={handleCopy}
          className="ml-2 text-base-content hover:text-primary transition"
          aria-label="Copy code"
        >
          {copySuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
              />
            </svg>
          )}
        </button>
      </div>
      <h2 className="text-lg sm:text-xl text-base-content font-bold break-words mb-1">{question}</h2>
      <div className="flex flex-wrap gap-2 items-center text-sm text-base-content/70 mb-1">
        <span>Answers: <span className="font-semibold text-base-content">{answerCount}</span></span>
        <span className="hidden sm:inline">|</span>
        {answerDeadline
          ? <span>Valid until: {new Date(answerDeadline).toLocaleString()} {new Date() > new Date(answerDeadline) && <span className="text-red-400 font-bold">(Closed)</span>}</span>
          : <span>No time limit</span>
        }
      </div>
      <div className="text-xs text-base-content/60">
        Asked: {askedDate}
        {updatedDate && <span> &middot; Updated: {updatedDate}</span>}
      </div>
    </div>
  );
};

export default QuestionCard;
