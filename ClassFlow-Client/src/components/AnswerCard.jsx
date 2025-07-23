import React from "react";

const AnswerCard = React.forwardRef(({ answer }, ref) => {
  const answerText = typeof answer.answer === "string" ? answer.answer : "";
  let formattedDate = "";

  if (answer.createdAt) {
    const dateObj = new Date(answer.createdAt);
    formattedDate = isNaN(dateObj.getTime()) ? "N/A" : dateObj.toLocaleString();
  } else {
    formattedDate = "N/A";
  }

  return (
    <div ref={ref} className="bg-gray-700 p-4 rounded-lg shadow">
      <div className="text-white mb-2">{answerText}</div>
      <div className="text-xs text-gray-400">Answered: {formattedDate}</div>
    </div>
  );
});

export default AnswerCard;
