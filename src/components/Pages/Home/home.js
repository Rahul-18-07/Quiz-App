import "../Home/home.css";
import { MenuItem, TextField, Button } from "@material-ui/core";
import CATEGORIES from "../../Data/categories";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
const Home = ({ name, setName, fetchQuestion }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (category === "" || difficulty === "" || name === "") {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestion(category, difficulty);
      navigate("/quiz");
    }
  };
  return (
    <div className="content">
      <div className="settings ">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
        {error && <ErrorMessage>Please Fill In All Detalis</ErrorMessage>}

        <div className="settings__select">
          <TextField
            label="Enter Your Name"
            variant="outlined"
            style={{ marginBottom: 25 }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <TextField
            select
            label="Select Catergory"
            variant="outlined"
            style={{ marginBottom: 25 }}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat.text} value={cat.value}>
                {cat.text}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            variant="outlined"
            style={{ marginBottom: 25 }}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClick}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <img src="/quiz.svg" className="banner" alt="" />
    </div>
  );
};
export default Home;
