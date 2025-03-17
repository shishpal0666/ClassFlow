const WelcomeCard = () => {
  return (
    <div>
      <div className="mockup-window bg-gray-800 mt-20 border border-gray-700 shadow-lg p-8 w-full max-w-2xl">
        <div className="grid place-content-center text-xl font-semibold text-white">
          Hello!
        </div>
      </div>
      <h1 className="text-4xl font-bold text-white mt-8">
        Welcome to <span className="text-blue-600">ClassFlow!</span>
      </h1>
      <p className="text-gray-400 mt-2 text-lg">
        The best place to engage, learn, and grow.
      </p>
    </div>
  );
};

export default WelcomeCard