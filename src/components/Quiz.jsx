import { useState, useEffect } from "react";
import quizData from "../data/quiz.json"; // Import file JSON

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }

    setSelectedAnswer(null);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "5px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const selectedButtonStyle = {
    ...buttonStyle,
    backgroundColor: "lightblue",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
  };

  if (showResult) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>Kết quả</h2>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Bạn đã trả lời đúng {score} trên {quizData.length} câu hỏi.
        </p>
        <button style={buttonStyle} onClick={handleRestartQuiz}>
          Làm lại
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
        Câu hỏi {currentQuestion + 1}
      </h2>
      <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>
        {quizData[currentQuestion].question}
      </h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {quizData[currentQuestion].options.map((option, index) => (
          <li key={index} style={{ margin: "10px 0" }}>
            <button
              onClick={() => handleAnswerClick(String.fromCharCode(65 + index))}
              disabled={selectedAnswer !== null}
              style={
                selectedAnswer === String.fromCharCode(65 + index)
                  ? selectedButtonStyle
                  : buttonStyle
              }
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          </li>
        ))}
      </ul>
      <button
        style={selectedAnswer === null ? disabledButtonStyle : buttonStyle}
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default Quiz;
