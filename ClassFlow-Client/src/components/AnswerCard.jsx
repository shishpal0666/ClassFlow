import React from "react";

const getCardSize = (answer) => {
  const length = answer.length;
  if (length < 100) return "card-xs";
  if (length < 200) return "card-sm";
  if (length < 350) return "card-md";
  if (length < 500) return "card-lg";
  return "card-xl";
};

const AnswerCard = ({ answer, index }) => (
  <div
    key={index}
    className={`card bg-base-100 shadow-lg ${getCardSize(answer)}`}
  >
    <div className="card-body bg-gray-800  md:p-6 rounded-lg shadow-md border-l-4 border-green-500">
      <p className="text-gray-200 text-lg">{answer}</p>
    </div>
  </div>
);

export default AnswerCard;
