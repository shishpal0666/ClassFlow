const Toast = ({ message, type }) => (
  <div
    className={`fixed top-22 left-1/2 transform -translate-x-1/2 z-50 w-auto min-w-min`}
  >
    <div
      className={`px-6 py-4 rounded-lg shadow-md ${
        type === "success"
          ? "bg-green-100 border-green-500 text-green-800"
          : "bg-red-100 border-red-500 text-red-800"
      }`}
    >
      <span className="font-medium">{message}</span>
    </div>
  </div>
);

export default Toast;
