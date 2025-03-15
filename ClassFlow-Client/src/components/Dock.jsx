import { NavLink } from "react-router";

const Dock = () => {
    return (
        <div className="dock bg-black text-neutral-content">
            <NavLink to="/">
                <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
                        <polyline
                            points="1 11 12 2 23 11"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        ></polyline>
                        <path
                            d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        ></path>
                        <line
                            x1="12"
                            y1="22"
                            x2="12"
                            y2="18"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        ></line>
                    </g>
                </svg>
                <span className="dock-label">Home</span>
            </NavLink>

            <NavLink to="/ask/question">
                <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
                        <polyline
                            points="3 14 9 14 9 17 15 17 15 14 21 14"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        ></polyline>
                        <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        ></rect>
                    </g>
                </svg>
                <span className="dock-label">Ask Questions</span>
            </NavLink>

            <NavLink to="/answer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <polyline strokeMiterlimit="10" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                    />
                </svg>
                <span className="dock-label">Answer</span>
            </NavLink>

            <NavLink to="/profile">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <polyline strokeMiterlimit="10" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                </svg>
                <span className="dock-label">Profile</span>
            </NavLink>

        </div>
    );
};

export default Dock;
