import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-24 w-24 text-gray-400 mb-8 dark:text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM15 12a3 3 0 11-6 0 3 3 0 016 0zM4 4v7m0 0v7m0-7h7m-7 0h7m13-7v7m0 0v7m0-7h7m-7 0h7"
                />
                <circle cx="12" cy="19" r="2" fill="#e88787" />
                <path d="M12 3v7m0 4v.01" stroke="#e88787" strokeWidth={2} />
            </svg>
            <h1 className="text-3xl font-bold mb-4 text-[#e88787]">Page Not Found</h1>
            <p className="text-gray-600 mb-8 dark:text-gray-300">Oops! The page you are looking for does not exist.</p>
            <Link to="/" className="text-blue-500 hover:underline dark:text-blue-300">Go back to Home</Link>
        </div>
    );
};

export default NotFound;
