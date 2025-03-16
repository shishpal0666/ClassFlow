import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const SubmitAnswer = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="flex flex-col  min-h-screen p-6 bg-gray-900">
      <h1>Submit Answer</h1>
    </div>
  );
};

export default SubmitAnswer;
