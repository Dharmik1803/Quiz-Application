import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchQuestions, answerQuestion, resetQuiz, nextQuestion } from '../../features/quiz/quizSlice';

const Quiz: React.FC = () => {
    const dispatch = useAppDispatch();
    const { questions, currentQuestionIndex, status, correctAnswers, incorrectAnswers } = useAppSelector((state) => state.quiz);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showResult, setShowResult] = useState<boolean>(false);
    const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null);
    const pathStyle = {
        strokeDasharray: `${currentQuestionIndex * 10}px, 100px`,
        strokeDashoffset: '0px',
        transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s linear 0s, 0.06s'
    };
    const pathStyleResult = {
        strokeDasharray: `${correctAnswers * 10}px, 100px`,
        strokeDashoffset: '0px',
        transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s linear 0s, 0.06s'
    };
    const pathStyleIncorrect = {
        strokeDasharray: `${incorrectAnswers * 10}px, 100px`,
        strokeDashoffset: '0px',
        transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s linear 0s, 0.06s'
    };
    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    const handleSubmit = () => {
        if (selectedAnswer === '') {
            alert('Please select an answer.');
            return;
        }

        // Check if the selected answer is correct
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion.correct_answer === selectedAnswer) {
            setAnswerStatus('correct');
            dispatch(answerQuestion({ answer: selectedAnswer }));
        } else {
            setAnswerStatus('incorrect');
            dispatch(answerQuestion({ answer: selectedAnswer }));
        }

        setShowResult(true); // Show result after submission
    };

    const handleNext = () => {
        setSelectedAnswer('');
        setShowResult(false);
        setAnswerStatus(null);
        dispatch(nextQuestion()); // Move to the next question
    };

    const handleReset = () => {
        dispatch(resetQuiz());
        setSelectedAnswer('');
        setShowResult(false);
        setAnswerStatus(null);
        dispatch(fetchQuestions());
    };

    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestionIndex >= 10) {
        return (
            <div className="text-center dark:text-white mt-5">
                <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
                <p>Total Questions Served: 10</p>
                <div className="w-full max-w-lg mx-auto my-7">
                    <div className="flex justify-between py-1">
                        <span className="text-base text-gray-lite font-semibold dark:text-[#A6A6A6]">Total Correct Answers:</span>
                        <span className="text-base font-semibold text-gray-lite pr-5 dark:text-[#A6A6A6]"> {correctAnswers}</span>
                    </div>
                    <svg className="rc-progress-line w-full" viewBox="0 0 100 1" preserveAspectRatio="none">
                        <path className="rc-progress-line-trail" d="M 0.5,0.5 L 99.5,0.5" strokeLinecap="round" stroke="#D9D9D9" strokeWidth="1" fillOpacity="0"></path>
                        <path className="rc-progress-line-path" d="M 0.5,0.5 L 99.5,0.5" strokeLinecap="round" stroke="#FF6464" strokeWidth="1" fillOpacity="0" style={pathStyleResult}></path>
                    </svg>
                </div>
                <div className="w-full max-w-lg mx-auto mb-7">
                    <div className="flex justify-between py-1">
                        <span className="text-base text-gray-lite font-semibold dark:text-[#A6A6A6]">Total Incorrect Answers:</span>
                        <span className="text-base font-semibold text-gray-lite pr-5 dark:text-[#A6A6A6]"> {incorrectAnswers}</span>
                    </div>
                    <svg className="rc-progress-line w-full" viewBox="0 0 100 1" preserveAspectRatio="none">
                        <path className="rc-progress-line-trail" d="M 0.5,0.5 L 99.5,0.5" strokeLinecap="round" stroke="#D9D9D9" strokeWidth="1" fillOpacity="0"></path>
                        <path className="rc-progress-line-path" d="M 0.5,0.5 L 99.5,0.5" strokeLinecap="round" stroke="#FF6464" strokeWidth="1" fillOpacity="0" style={pathStyleIncorrect}></path>
                    </svg>
                </div>

                <button
                    onClick={handleReset}
                    className="bg-[#668c9b] text-white px-4 py-2 rounded my-5"
                >
                    Restart Quiz
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 dark:text-white">
            <div className="mb-7">
                <div className="flex justify-between py-1">
                    <span className="text-base font-semibold text-gray-lite pr-5 dark:text-[#A6A6A6]">{currentQuestionIndex * 10}%</span>
                </div>
                <svg className="rc-progress-line" viewBox="0 0 100 1" preserveAspectRatio="none">
                    <path className="rc-progress-line-trail" d="M 0.5,0.5
         L 99.5,0.5" strokeLinecap="round" stroke="#D9D9D9" strokeWidth="1" fillOpacity="0"></path>
                    <path className="rc-progress-line-path" d="M 0.5,0.5
         L 99.5,0.5" strokeLinecap="round" stroke="#FF6464" strokeWidth="1" fillOpacity="0"
                        style={pathStyle}
                    >
                    </path>
                </svg>
            </div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Failed to fetch questions</p>}
            {status === 'succeeded' && currentQuestion && (
                <>
                    <h2
                        className="text-xl font-bold mb-4"
                        dangerouslySetInnerHTML={{
                            __html: `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`
                        }}
                    />
                    <div className="mb-4">
                        {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort().map((answer, index) => {
                            const isSelected = selectedAnswer === answer;
                            const isCorrectAnswer = currentQuestion.correct_answer === answer;
                            // const isIncorrectAnswer = isSelected && answerStatus === 'incorrect';

                            let borderColor = 'border-gray-300 dark:border-gray-500';
                            let bgClass = '';
                            let textClass = '';

                            if (showResult) {
                                if (isSelected) {
                                    borderColor = isCorrectAnswer ? 'border-green-500 dark:border-green-500' : 'border-red-500 dark:border-red-500';
                                    bgClass = isCorrectAnswer ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-[#813939de]';
                                    textClass = isCorrectAnswer ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400';
                                } else if (isCorrectAnswer) {
                                    borderColor = 'border-green-500 dark:border-green-500';
                                    bgClass = 'bg-green-100 dark:bg-green-900';
                                    textClass = 'text-green-500 dark:text-green-400';
                                }
                            }

                            return (
                                <label
                                    key={index}
                                    className={`block p-4 mb-2 border rounded cursor-pointer ${borderColor} ${bgClass} ${isSelected && !showResult ? ' dark:bg-[#668c9b80] bg-[#e88787]  text-white' : ''} ${showResult ? 'cursor-not-allowed' : ''} ${isSelected ? 'font-bold' : ''} ${isSelected && !showResult ? 'text-white' : 'dark:text-white'}`}
                                >
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={answer}
                                        checked={selectedAnswer === answer}
                                        onChange={(e) => setSelectedAnswer(e.target.value)}
                                        className="hidden"
                                        disabled={showResult}
                                    />
                                    <div className={`p-4 ${isSelected && !showResult ? 'text-white rounded' : ''} ${textClass}`}>
                                        <h2
                                            className="text-xl font-bold mb-4"
                                            dangerouslySetInnerHTML={{
                                                __html: `${answer}`
                                            }}
                                        />
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                    {!showResult ? (
                        <button
                            onClick={handleSubmit}
                            className="dark:bg-[#668c9b] bg-[#e88787] text-white px-4 py-2 rounded disabled:opacity-50"
                            disabled={!selectedAnswer}
                        >
                            Submit
                        </button>
                    ) : (
                        <>
                            {answerStatus === 'correct' ? (
                                <p className="text-green-500 dark:text-green-400 py-3">Correct!</p>
                            ) : (
                                <>
                                    <p className="text-red-500 dark:text-red-400 py-3">Incorrect!</p>
                                    <p className='py-3'>The correct answer is: {currentQuestion.correct_answer}</p>

                                </>
                            )}
                            <button
                                onClick={handleNext}
                                className="dark:bg-[#668c9b] bg-[#e88787] text-white px-4 py-2 rounded"
                            >
                                Next
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Quiz;
