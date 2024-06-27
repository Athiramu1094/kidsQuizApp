import { useState } from 'react';
import './App.css';

function App() {
  const questions = [
    {
      question: "Which planet is known as the Red Planet?",
      answerOptions: [
        { answer: "Mars", isCorrect: true },
        { answer: "Venus", isCorrect: false },
        { answer: "Jupiter", isCorrect: false }
      ]
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answerOptions: [
        { answer: "William Shakespeare", isCorrect: true },
        { answer: "Mark Twain", isCorrect: false },
        { answer: "Charles Dickens", isCorrect: false }
      ]
    },
    {
      question: "What is the chemical symbol for water?",
      answerOptions: [
        { answer: "H2O", isCorrect: true },
        { answer: "CO2", isCorrect: false },
        { answer: "NaCl", isCorrect: false }
      ]
    },
    {
      question: "Which element is known as the king of metals?",
      answerOptions: [
        { answer: "Gold", isCorrect: true },
        { answer: "Silver", isCorrect: false },
        { answer: "Platinum", isCorrect: false }
      ]
    },
    {
      question: "What is the capital of France?",
      answerOptions: [
        { answer: "Paris", isCorrect: true },
        { answer: "Madrid", isCorrect: false },
        { answer: "Rome", isCorrect: false }
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  const nextQuestion = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswerIndex(null);
    setCorrectAnswerIndex(null);
  };

  const finishQuiz = () => {
    setShowScore(true);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswerIndex(null);
    setCorrectAnswerIndex(null);
  };

  const handleAnswerClick = (isCorrect, index) => {
    setSelectedAnswerIndex(index);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      const correctIndex = questions[currentIndex].answerOptions.findIndex(
        (option) => option.isCorrect
      );
      setCorrectAnswerIndex(correctIndex);
    }
  };

  return (
    <div className="parent">
    
      <img className="img" src="/quiz.png" alt="" />
      <img className='logo' src="/QuizLogo.png" alt="" />
      <div className="container">
      
        {!showScore && (
          <>
            <h2>{questions[currentIndex].question}</h2>
            <div className="answer-options">
              {questions[currentIndex].answerOptions.map((answer, index) => (
                <button 
                  key={index}
                  onClick={() => handleAnswerClick(answer.isCorrect, index)}
                  className={
                    selectedAnswerIndex === index
                      ? answer.isCorrect
                        ? "correct"
                        : "wrong"
                      : correctAnswerIndex === index
                      ? "correct"
                      : ""
                  }
                  disabled={
                    selectedAnswerIndex !== null ||
                    correctAnswerIndex !== null
                  }
                >
                  {answer.answer}
                </button>
              ))}
                </div>


              {currentIndex < questions.length - 1 && (
                <button className="next-btn" onClick={nextQuestion}>
                  <span class="material-symbols-outlined">
                    arrow_forward_ios
                  </span>
                </button>
              )}
              {currentIndex === questions.length - 1 && (
                <button className="finish-btn" onClick={finishQuiz}>
                  Finish Quiz
                </button>
              )}
          
          </>
        )}

        {showScore && (
          <div className="score-container">
            <h2 className='score'>You scored  <br /> {score} / {questions.length}</h2>
            <button className="reset-btn" onClick={resetQuiz}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
