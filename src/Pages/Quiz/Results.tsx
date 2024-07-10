import React from 'react';

interface ResultProps {
    correctAnswers: number;
    incorrectAnswers: number;
    onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ correctAnswers, incorrectAnswers, onReset }) => {
    return (
        <div className="text-center dark:text-white my-5">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
            <p>Total Questions Served: 10</p>
            <p>Total Correct Answers: {correctAnswers}</p>
            <p>Total Incorrect Answers: {incorrectAnswers}</p>
            <button
                onClick={onReset}
                className="bg-[#668c9b] text-white px-4 py-2 my-5 rounded"
            >
                Restart Quiz
            </button>
        </div>
    );
};

export default Result;
