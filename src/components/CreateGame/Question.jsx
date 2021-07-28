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
  question,
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
          questionId: question?.id,
          question: question?.content,
          currentAnswer: question?.correctAnswer,
          currentType: question?.type,
        })
      );
    }
  };
  return (
    <div className={question} onClick={openModal}>
      {questionNum}.{' '}
      {question?.[0]?.content ? question?.[0]?.content : 'N/A'}
      <div className={questionDetails}>{`[${
        question?.[0]?.correctAnswer
          ? question?.[0].correctAnswer
          : 'No correct answer yet'
      }]`}</div>
    </div>
  );
}