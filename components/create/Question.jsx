import React, { useState, useEffect } from "react";

import styles from "../../styles/Create.module.css";
import {openQuestionModal, closeQuestionModal} from '../../redux/actions/ModalActions';
import {useDispatch, useSelector} from 'react-redux';
const {
   backdrop,
   modal,
   question,
   questionDetails
} = styles;

export default function Question({ questionNum, currentQuestion, currentRound }) {
  console.log({questionNum, currentQuestion})
  const dispatch = useDispatch();
  const isModalOpen = useSelector(state => state.modal.isModalOpen);
  const openModal = () => {
    if (!isModalOpen) {
      dispatch(openQuestionModal({roundNum: currentRound, questionNum}));
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