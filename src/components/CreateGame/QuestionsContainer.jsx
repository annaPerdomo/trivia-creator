import React from "react";
import styles from "../../styles/Create.module.css";
import Question from "./Question";

const {} = styles;

export default function QuestionsContainer(props) {
  const { currentRound, questions, questionNumberList } = props;
  const currentRoundQuestions = questions.filter(
    (questionData) => questionData.roundNum === currentRound
  );
  return (
    <div id={styles.questions}>
      {questionNumberList.map((questionNum, index) => (
        <Question
          key={index}
          questionNum={index + 1}
          currentRound={currentRound}
          currentQuestion={currentRoundQuestions.filter(
            (questionData) => questionData.questionNum === index + 1
          )}
        />
      ))}
    </div>
  );
}