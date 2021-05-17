import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import styles from "../../styles/Create.module.css";
import Bar from "./Bar.jsx";
import Modal from '../Modal/Modal';
import AddQuestionForm from './AddQuestionForm';
const {
  create,
  title,
  start,
  upload,
  bigRec,
  bars,
  logo
} = styles;


export default function Create({ questions }) {
  const [currentRound, setCurrentRound] = useState(null);
  const [triviaQuestions, setTriviaQuestions] = useState(null);

  useEffect(() => {
    if (questions && !triviaQuestions) {
      setTriviaQuestions(questions);
    }
  }, [])

  function barClick(i) {
    if (currentRound === i) {
      setCurrentRound(null);
    } else {
      setCurrentRound(i);
    }
  }
  const displayNewTriviaQuestion = (newQuestionData) => {
   const triviaQuestionsCopy = triviaQuestions.slice();
   triviaQuestionsCopy.push(newQuestionData);
   setTriviaQuestions(triviaQuestionsCopy);
  }

  return (
    <div id={create}>
      <div id={title}>
        <p>Create</p>
      </div>
      <div id={start}>
        <Link href="/wait">
          <p>Start Game</p>
        </Link>
      </div>
      <div id={upload}>
        <p>Upload</p>
      </div>
      <div id={bigRec}>
        <div id={bars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Bar
              currentRound={currentRound}
              questions={triviaQuestions}
              onClick={() => {
                barClick(i);
              }}
              selected={currentRound === i ? true : false}
              roundNum={i}
            />
          ))}
        </div>

        <p id={logo}>it's a trivia&trade;</p>
      </div>
      <Modal selector="#modal">
        <AddQuestionForm
          displayNewTriviaQuestion={displayNewTriviaQuestion}
        />
      </Modal>
    </div>
  );
}
