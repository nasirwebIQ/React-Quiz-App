import { createContext, useEffect, useState } from "react";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [quizs, setQuizs] = useState([]);
  const [question, setQuesion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [marks, setMarks] = useState(0);
  console.log(question);

  useEffect(() => {
    fetch("quiz.json")
      .then((res) => res.json())
      .then((data) => setQuizs(data));
  }, []);
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuesion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };
  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  // check answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);
      if (selected === question.answer) {
        event.target.classList.add("bg-success");
        setMarks(marks + 5);
      } else {
        event.target.classList.add("bg-danger");
      }
    }
  };
  // Next Quesion
  const nextQuestion = () => {
    setSelectedAnswer("");
    setCorrectAnswer("");
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
    setQuestionIndex(questionIndex + 1);
  };
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
  };

  return (
    <DataContext.Provider
      value={{
        quizs,
        showStart,
        startQuiz,
        showQuiz,
        question,
        checkAnswer,
        correctAnswer,
        questionIndex,
        nextQuestion,
        selectedAnswer,
        showTheResult,
        showResult,
        startOver,
        marks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
