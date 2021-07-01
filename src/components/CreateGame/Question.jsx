import React, { useState, useEffect } from "react";

import styles from "../../styles/Create.module.css";
import {openQuestionModal, closeQuestionModal} from '../../redux/reducers/createGameSlice';
import { useAppSelector, useAppDispatch } from "../../../lib/hooks"
const {
   backdrop,
   modal,
   question,
   questionDetails
} = styles;

export default function Question({
  questionNum,
  currentQuestion,
  currentRound,
}) {
  const dispatch = useAppDispatch();
  const isAddQuestionModalOpen = useAppSelector(
    (state) => state.createGame.isAddQuestionModalOpen
  );
  const openModal = () => {
    if (!isAddQuestionModalOpen) {
      dispatch(
        openQuestionModal({
          roundNum: currentRound,
          questionNum,
          questionId: currentQuestion?.[0]?.id,
          currentQuestion: currentQuestion?.[0]?.content,
          currentAnswer: currentQuestion?.[0]?.correctAnswer,
          currentType: currentQuestion?.[0]?.type,
        })
      );
    }
  };
  return (
    <div className={question} onClick={openModal}>
      {questionNum}.{' '}
      {currentQuestion?.[0]?.content ? currentQuestion?.[0]?.content : 'N/A'}
      <div className={questionDetails}>{`[${
        currentQuestion?.[0]?.correctAnswer
          ? currentQuestion?.[0].correctAnswer
          : 'No correct answer yet'
      }]`}</div>
    </div>
  );
}