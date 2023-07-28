import axios from "axios";
import React, { useEffect, useState } from "react";
import { Aws, Bar, Crt, Den, Next, Ques, Res, Wng } from "./styled";
import { Button } from "react-bootstrap";

export const Import = () => {
  const [data, setData] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then((data) => {
        setData(data?.data?.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateScore = () => {
    if (clickedOption === data[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };

  return (
    <Den>
      {showResult ? (
        <Res>
          <h3>Result</h3>

          <Crt>
            Total Correct:
            {score}
          </Crt>
          <Wng>Total wrong:{data.length - score} </Wng>
          <h4>Total NO OF QUESTION :{data.length}</h4>
          <br></br>
          <Button onClick={resetAll}>Try Again</Button>
        </Res>
      ) : (
        <Bar>
          <Ques>
            <h5>
              <span>{currentQuestion + 1}. </span>
              <span>{data[currentQuestion]?.question}</span>
            </h5>
          </Ques>
          <hr></hr>
          <Aws>
            {data[currentQuestion]?.incorrect_answers.map(
              (option: any, i: any) => {
                return (
                  <button
                    className={`option-btn ${
                      clickedOption == i + 1 ? "checked" : null
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option},
                  </button>
                );
              }
            )}
            <button onClick={() => setScore(score + 1)}>
              {data[currentQuestion]?.correct_answer}
            </button>
          </Aws>

          <Next>
            <Button onClick={changeQuestion}>Next</Button>
          </Next>
        </Bar>
      )}
    </Den>
  );
};
