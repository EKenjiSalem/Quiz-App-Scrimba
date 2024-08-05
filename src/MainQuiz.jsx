import React, { useState, useEffect } from 'react';
import './App.css';

function MainQuiz() {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    function fetchQuestions() {
        fetch('https://opentdb.com/api.php?amount=5&category=17')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const shuffledQuestions = data.results.map(question => {
                    const allAnswers = [...question.incorrect_answers, question.correct_answer];
                    return {
                        ...question,
                        allAnswers: shuffleQuestions(allAnswers)
                    };
                });
                setQuestions(shuffledQuestions);
            });
    }

    function shuffleQuestions(array) {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; 
        }
        return shuffledArray;
    }

    const handleAnswerClick = (questionIndex, answer) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionIndex]: answer
        }));
    };

    const calculateScore = () => {
        setShowResults(true);
    };

    const correctAnswers = questions.map((question, index) => ({
        question: question.question,
        correct_answer: question.correct_answer,
        selected_answer: selectedAnswers[index] || 'Not Answered'
    }));

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">Welcome to the Quiz</h1>
            {showResults ? (
                <div className="results-container">
                    <h1>Quiz Results</h1>
                    <ul>
                        {correctAnswers.map((item, index) => (
                            <li
                                key={index}
                                className={item.selected_answer === item.correct_answer ? 'correct' : 'incorrect'}>
                                <div className='questions-results'>
                                    <strong>Question:</strong> {decodeURIComponent(item.question)}<br />
                                    <div className="question-key">
                                        <strong>Selected Answer:</strong> {decodeURIComponent(item.selected_answer)}<br />
                                    </div>
                                    <strong>Correct Answer:</strong> {decodeURIComponent(item.correct_answer)}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => {
                        setShowResults(false);
                        setSelectedAnswers({});
                        fetchQuestions();
                    }} className="score-button">Back to Quiz</button>
                </div>
            ) : (
                <>
                    {questions.map((question, index) => (
                        <div key={index} className="question-card">
                            <h2>{decodeURIComponent(question.question)}</h2>
                            <ul>
                                {question.allAnswers.map((answer, i) => (
                                    <li
                                        key={i}
                                        className={
                                            selectedAnswers[index] === answer 
                                            ? answer === question.correct_answer 
                                                ? 'correct' 
                                                : 'incorrect' 
                                            : ''
                                        }
                                        onClick={() => handleAnswerClick(index, answer)}
                                    >
                                        {decodeURIComponent(answer)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <button onClick={calculateScore} className="score-button">Check Answers</button>
                </>
            )}
        </div>
    );
}

export default MainQuiz;
