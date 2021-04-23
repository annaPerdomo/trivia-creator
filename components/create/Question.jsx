import React, { useState, useEffect } from "react";
import styles from "../../styles/Create.module.css";
import AddQuestionModal from './AddQuestionModal';
const {
   backdrop,
   modal,
   question,
   questionDetails
} = styles;

export default function Question({ text, num }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
   if (!isModalOpen) {
      setIsModalOpen(true);
   }
  }
  const closeModal = () => {
     setIsModalOpen(false)
  }
  return (
    <div
      className={question}
      onClick={openModal}
    >
      {num}. {text}
      {isModalOpen ? (
        <div className={questionDetails}>
          <AddQuestionModal selector="#modal">
            <div className={backdrop}>
              <div className={modal}>
                <div>
                   <div>
                     <label for="question">Question</label>
                     <input type="text" name="question"></input>
                   </div>
                   <div>
                     <label for="answer">Answer</label>
                     <input type="text" name="answer"></input>
                   </div>
                </div>
                <div>
                  <button type="button" onClick={closeModal}>
                     Close Modal
                  </button>
                  <button>Submit Question</button>
                </div>
              </div>
            </div>
          </AddQuestionModal>
        </div>
      ) : (
        <div>{`[Where the answer will be if there is one]`}</div>
      )}
    </div>
  );
}