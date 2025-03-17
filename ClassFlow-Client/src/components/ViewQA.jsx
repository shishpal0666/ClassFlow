import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

const ViewQA = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const { quesCode } = useParams();
  console.log(quesCode);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col  min-h-screen p-6 bg-gray-900">
      <h1>View Q & A</h1>
    </div>
  );
};

export default ViewQA;
