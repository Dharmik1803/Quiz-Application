import React from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeImg from "../assets/welcome.svg";

const Welcome: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row h-screen items-center justify-center p-4 md:p-0">
            <div className="mb-4 px-5 flex flex-col items-center justify-center gap-2 text-slate-700 dark:text-white text-center">
                <h3 className="text-3xl md:text-[64px] font-light leading-tight md:leading-[64px]">
                    Welcome to the
                </h3>
                <h3 className="animate-typing overflow-hidden whitespace-nowrap text-3xl md:text-[64px] text-[#e88787] font-medium leading-tight md:leading-[64px]">
                    Practical Quiz !
                </h3>

                <button onClick={() => navigate('/quiz')} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Start Quiz
                </button>
            </div>
            <div className="mt-4 md:mt-0">
                <img src={welcomeImg} alt="Welcome" className="w-full max-w-xs md:max-w-md" />
            </div>
        </div>
    );
};

export default Welcome;
