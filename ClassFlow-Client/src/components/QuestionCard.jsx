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
    <div className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
          Question
        </span>
        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
          {quesCode}
        </span>
        <button 
          onClick={handleCopy}
          className="ml-2 text-gray-300 hover:text-white"
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
      <h2 className="text-xl text-white font-bold">{question}</h2>
      <div className="text-sm text-gray-400 mb-1">Answers: {answerCount}</div>
      <div className="text-xs text-gray-500 mb-1">
        {answerDeadline
          ? <span>Valid until: {new Date(answerDeadline).toLocaleString()} {new Date() > new Date(answerDeadline) && <span className="text-red-400 font-bold">(Closed)</span>}</span>
          : <span>No time limit</span>
        }
      </div>
      <div className="text-xs text-gray-500">
        Asked: {askedDate}
        {updatedDate && <span> &middot; Updated: {updatedDate}</span>}
      </div>
    </div>
  );
};

export default QuestionCard;
