import React from "react";
import { Link } from "wouter";

const NotFound: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center px-4 py-16 text-white font-sans text-center">
            <img
                src="/logo.svg"
                alt="Oops!"
                className="w-48 h-48 object-contain mb-6"
            />
            <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">
                Страница не найдена... :(
            </h2>
            <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition"
            >
                🍽 Əsas səhifəyə qayıt
            </Link>
        </div>
    );
};

export default NotFound;
