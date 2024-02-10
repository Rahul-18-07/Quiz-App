import "./styles.css";
import Header from "./components/Header/header";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Footer from "./components/Footer/footer";
import Home from "./components/Pages/Home/home";
import Quiz from "./components/Pages/Quiz/quiz";
import Result from "./components/Pages/Result/Result";
import { useState } from "react";
import axios from "axios";
const App = () => {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: 'url("/ques1.png")' }}>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestion={fetchQuestions}
              />
            }
          />
          <Route
            exact
            path="/quiz"
            element={
              <Quiz
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
              />
            }
          />
          <Route
            exact
            path="/result"
            element={
              <Result
                name={name}
                score={score}
                setScore={setScore}
                setName={setName}
              />
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
