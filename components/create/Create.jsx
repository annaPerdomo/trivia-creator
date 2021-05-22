import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import styles from "../../styles/Create.module.css";
import Bar from "./Bar.jsx";
import Modal from '../Modal/Modal';
import AddQuestionForm from './AddQuestionForm';
import {clearTriviaQuestionsFromState, setTriviaId} from '../../redux/actions/CreateGameActions';
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
  const dispatch = useDispatch();
  const [currentRound, setCurrentRound] = useState(null);
  const [triviaQuestions, setTriviaQuestions] = useState(null);
  const newQuestion = useSelector(state => state.createGame.newQuestion);
  const editedQuestion = useSelector(state => state.createGame.editedQuestion);
  const triviaId = useSelector(state => state.createGame.triviaId);
  console.log({questions})
  useEffect(() => {
    if (questions?.length && !triviaQuestions) {
      setTriviaQuestions(questions);
      dispatch(setTriviaId(questions[0].triviaId));
    } else {
      setTriviaQuestions([])
    }
  }, []);
  useEffect(() => {
    if (newQuestion) {
      displayNewTriviaQuestion(newQuestion);
    } else if (editedQuestion) {
      displayEditedTriviaQuestion(editedQuestion);
    }
    dispatch(clearTriviaQuestionsFromState());
  }, [newQuestion, editedQuestion]);
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
  };
  const displayEditedTriviaQuestion = (editedQuestion) => {
    const {id, type, content, correctAnswer} = editedQuestion;
    const triviaQuestionsCopy = triviaQuestions.slice();
    triviaQuestionsCopy.map(triviaQuestion => {
      if (triviaQuestion.id === id) {
        triviaQuestion.type = type;
        triviaQuestion.content = content,
        triviaQuestion.correctAnswer = correctAnswer;
      }
      return triviaQuestion;
    })
  };
  return (
    <div id={create}>
      <div id={title}>
        <p>Create</p>
      </div>
      <div id={start}>
        <Link href={`/game/${triviaId}/round-1/admin/play`}>
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
              key={i}
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
        <AddQuestionForm />
      </Modal>
    </div>
  );
}
