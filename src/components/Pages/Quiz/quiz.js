import { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import "./Quiz.css";
import Question from "../../Question/Question";
import he from "he";
const Quiz = ({ name, score, setQuestions, setScore, questions }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers
        ])
    );
  }, [currQues, questions]);

  const handleShuffle = (optionss) => {
    const op = optionss.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 4; i++) {
      op[i] = he.decode(op[i]);
    }
    return op;
  };

  return (
    <div className="quiz">
      <span className="subtitle">Welcome {name}</span>
      {questions ? (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>Score : {score}</span>
          </div>

          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={he.decode(questions[currQues]?.correct_answer)}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};
export default Quiz;
