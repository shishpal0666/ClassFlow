const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-gray-800">
      <div className="text-center p-6 bg-black shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl text-amber-50 font-semibold mt-2">Page Not Found</h2>
        <p className="text-amber-50 mt-2">Oops! The page you are looking for doesn’t exist.</p>
        <a
          href="/"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;
