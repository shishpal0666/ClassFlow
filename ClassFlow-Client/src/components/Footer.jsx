const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between bg-neutral text-neutral-content p-6">
      <div className="flex items-center space-x-3">
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} ClassFlow - All Rights Reserved
        </p>
      </div>

      {/* Right Section: Social Media Links */}
      <nav className="flex space-x-6 mt-4 md:mt-0">
        {/* GitHub */}
        <a
          href="https://github.com/shishpal0666"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.087-.744.083-.729.083-.729 1.205.085 1.838 1.24 1.838 1.24 1.07 1.835 2.805 1.304 3.49.997.108-.776.42-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.137 3.002.404 2.297-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.81 1.103.81 2.22 0 1.604-.015 2.898-.015 3.292 0 .32.21.698.825.577 4.765-1.585 8.205-6.082 8.205-11.385 0-6.627-5.373-12-12-12z"></path>
          </svg>
        </a>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/shishpal-polampally"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M22.23 0h-20.46c-.974 0-1.77.797-1.77 1.771v20.457c0 .974.796 1.772 1.77 1.772h20.459c.974 0 1.771-.798 1.771-1.772v-20.457c0-.974-.797-1.771-1.771-1.771zm-15.385 20.452h-3.077v-10.77h3.077v10.77zm-1.539-12.292c-.987 0-1.792-.803-1.792-1.792 0-.988.805-1.792 1.792-1.792s1.792.804 1.792 1.792c0 .989-.805 1.792-1.792 1.792zm14.539 12.292h-3.077v-5.385c0-1.282-.026-2.923-1.78-2.923-1.785 0-2.057 1.394-2.057 2.833v5.475h-3.077v-10.77h2.956v1.472h.042c.412-.78 1.422-1.605 2.927-1.605 3.132 0 3.712 2.064 3.712 4.747v6.156z"></path>
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
