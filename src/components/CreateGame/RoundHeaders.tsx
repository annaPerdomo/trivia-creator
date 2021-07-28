// @ts-check
import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
import Question from "./Question";
import QuestionsContainer from "./QuestionsContainer";
import {
  openQuestionModal,
  closeQuestionModal,
} from "../../redux/reducers/createGameSlice";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { QuestionType } from "../../redux/reducers/createGameSlice";
const {
  bar,
  barContainer,
  selected,
  triangle,
  question,
  questions,
  questionDetails,
} = styles;

interface Props {
  key: number;
  openRoundNumber: number;
  questions: QuestionType[];
  onClick: () => void;
  selected: boolean;
  roundNum: number;
}

//add question logic. Right now question number list is a static array
//
export default function RoundHeaders<Props>(props) {
  const dispatch = useAppDispatch();
  const isAddQuestionModalOpen = useAppSelector(
    (state) => state.createGame.isAddQuestionModalOpen
  );
  console.log(props.questions);
  const noQuestions = props.questions?.length > 0;
  const openModal = (question: QuestionType) => {
    if (!isAddQuestionModalOpen) {
      dispatch(
        openQuestionModal({
          roundNum: props.roundNum,
          questionNum: props.questions.length + 1,
          // questionId: question?.[0]?.id,
          // currentQuestion: question?.[0]?.content,
          // currentAnswer: question?.[0]?.correctAnswer,
          // currentType: question?.[0]?.type,
        })
      );
    }
  };
  return (
    <div className={barContainer}>
      <div
        className={props.selected ? `${bar} ${selected}` : bar}
        onClick={props.onClick}
      >
        <div
          className={props.selected ? `${triangle} ${selected}` : triangle}
        ></div>
        <p>{props.roundNum}</p>
        <p>Round</p>
      </div>
      {props.selected ? (
        <>
          <div id={questions}>
            {props.questions.map((question, index) => (
              <Question question={question} questionNum={index} />
            ))}
            {/* 
              iterate through questions duh
                when question is cicked on, dispatch the modal
            <QuestionsContainer
              questionNumberList={[1, 2, 3, 4, 5]}
              currentRound={props.openRoundNumber}
              questions={props.questions}
            /> */}
            <div id={questions}>
              <div className={question} onClick={openModal}>
                <div>+ Add Question</div>
              </div>
            </div>
          </div>
        </>
      ) : // <h1>Question</h1>
      null}
    </div>
  );
}
