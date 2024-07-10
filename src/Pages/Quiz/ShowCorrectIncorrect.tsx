import React from 'react';

interface ShowCorrectIncorrectProps {
    isCorrect: boolean;
    correctAnswer: string;
    explanation?: string;
}

const ShowCorrectIncorrect: React.FC<ShowCorrectIncorrectProps> = ({ isCorrect, correctAnswer, explanation }) => {
    return (
        <>
            {isCorrect ? (
                <p className="text-green-500 dark:text-green-400">Correct!</p>
            ) : (
                <>
                    <p className="text-red-500 dark:text-red-400">Incorrect!</p>
                    <p>The correct answer is: {correctAnswer}</p>
                    {explanation && (
                        <p>{explanation}</p>
                    )}
                </>
            )}
        </>
    );
};

export default ShowCorrectIncorrect;
