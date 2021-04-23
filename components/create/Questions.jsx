import React from "react";
import styles from "../../styles/Create.module.css";
import Question from "./Question";

const {} = styles;

export default function Questions(props) {
  const { currentRound, questions } = props;
  const currentRoundQuestions = questions.filter(
    (questionData) => questionData.roundNum === currentRound
  );
  return (
    <div id={styles.questions}>
      {props.arr.map((questionNum, index) => (
        <Question
          key={index}
          num={index + 1}
          currentQuestion={currentRoundQuestions.filter(
            (questionData) => questionData.questionNum === index + 1
          )}
        />
      ))}
    </div>
  );
}