// @ts-check
import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from "../../styles/Create.module.css";
import Bar from "./Bar.jsx";
import Modal from '../Modal/Modal';
import AddQuestionForm from './AddQuestionForm';
import { clearTriviaQuestionsFromState, setTriviaId } from '../../redux/reducers/createGameSlice';
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
import { current } from "@reduxjs/toolkit";
const {
  create,
  title,
  start,
  upload,
  bigRec,
  bars,
  logo
} = styles;

export type CreateProps = {
  id: number,
  triviaId?: number, 
  roundNum?: number, 
  questionNum?: number, 
  content?: string, 
  type?: string,
  correctAnswer?: string,
}

//can grab game code from route params
export default function CreateGame({ questions, currentGameId }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [currentRound, setCurrentRound] = useState(null);
  const [triviaQuestions, setTriviaQuestions] = useState(null);
  const newQuestion = useAppSelector(state => state.createGame.newQuestion);
  const editedQuestion = useAppSelector(state => state.createGame.editedQuestion);
  const triviaId = useAppSelector(state => state.createGame.triviaId);
  const triviaJoinCode = router.query.joinCode;
  useEffect(() => {
    if (questions?.length && !triviaQuestions) {
      setTriviaQuestions(questions);
    } else {
      setTriviaQuestions([])
    }
    dispatch(setTriviaId(currentGameId))
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
    setTriviaQuestions(triviaQuestionsCopy);
  };
  return (
    <div id={create}>
      <div id={title}>
        <p>Create</p>
      </div>
      <div id={start}>
        <Link href={`/game/${triviaJoinCode}/lobby`}>
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
