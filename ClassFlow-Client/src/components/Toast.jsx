const Toast = ({ message, type }) => (
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-xs sm:max-w-md">
    <div
      className={`alert flex items-center gap-2 px-6 py-4 rounded-lg shadow-lg border-2 transition-all duration-300
        ${type === "success"
          ? "alert-success border-green-400"
          : "alert-error border-red-400"}
      `}
      role="alert"
    >
      {type === "success" ? (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      <span className="font-medium text-base-content">{message}</span>
    </div>
  </div>
);

export default Toast;
