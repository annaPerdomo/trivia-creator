import React, { useState, useEffect } from "react";
import styles from '../../../styles/Create.module.css';
const {backdrop, modal} = styles;

export default function AddQuestionForm({closeModal}) {
  const submitQuestion = async (e) => {
    console.log({e})
    e.preventDefault();
  //   const data = {
  //    triviaId: 2,
  //    roundNum: 1,
  //    questionNum: 2,
  //    content: 'Who is the best partner in the world?',
  //    type: 'text',
  //    correctAnswer: 'Daniel'
  // }
  // await fetch('http://localhost:3000/api/post/questions', {
  //    method: 'PUT',
  //    headers: {
  //       'Content-Type': 'application/json'
  //    },
  //    body: JSON.stringify(data)
  //  })
 }
  return (
    <div className={backdrop}>
    <div className={modal}>
     <form>
         <div>
           <label for="question">Question: </label>
           <input type="text" name="question"></input>
         </div>
         <div>
           <label for="answer">Answer: </label>
           <input type="text" name="answer"></input>
         </div>
         <div>
           <label for="type-select">Type: </label>
           <select name="type" id="type-select">
             <option value="">--Please choose one--</option>
             <option value="text">Text</option>
             <option value="visual">Visual</option>
             <option value="audio">Audio</option>
           </select>
         </div>

      <div>
        <button type="button" onClick={closeModal}>
           Cancel
        </button>
      </div>
      <div>
        <button onClick={submitQuestion}>Submit Question</button>
      </div>
     </form>
    </div>
  </div>
  )
}