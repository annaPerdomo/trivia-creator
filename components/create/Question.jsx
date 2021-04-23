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
  const submitQuestion = async (e) => {
     e.preventDefault();
     const data = {
      triviaId: 2,
      roundNum: 1,
      questionNum: 2,
      content: 'Who is the best partner in the world?',
      type: 'text',
      correctAnswer: 'Daniel'
   }
   await fetch('http://localhost:3000/api/post/questions', {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
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
               <form>
                   <div>
                     <label for="question">Question</label>
                     <input type="text" name="question"></input>
                   </div>
                   <div>
                     <label for="answer">Answer</label>
                     <input type="text" name="answer"></input>
                   </div>

                <div>
                  <button type="button" onClick={closeModal}>
                     Close Modal
                  </button>
                </div>
                <div>
                  <button onClick={submitQuestion}>Submit Question</button>
                </div>
               </form>
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