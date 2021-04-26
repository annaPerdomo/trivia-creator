import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
import AddQuestionModal from './AddQuestionModal/AddQuestionModal';
import AddQuestionForm from './AddQuestionModal/AddQuestionForm';
const {
   backdrop,
   modal,
   question,
   questionDetails
} = styles;

export default function Question({ num, currentQuestion }) {
  console.log({ currentQuestion });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={question} onClick={openModal}>
      {num}. {currentQuestion?.[0]?.content ? currentQuestion?.[0]?.content : 'N/A'}
      {isModalOpen ? (
        <div className={questionDetails}>
          <AddQuestionModal selector="#modal">
            <AddQuestionForm closeModal={closeModal} />
          </AddQuestionModal>
        </div>
      ) : (
        <div>{`[${
          currentQuestion?.[0]?.correctAnswer
            ? currentQuestion?.[0].correctAnswer
            : 'No correct answer yet'
        }]`}</div>
      )}
    </div>
  );
}