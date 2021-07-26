// @ts-check
import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from "../../styles/Create.module.css";
import RoundHeaders from "./RoundHeaders";
import Modal from '../Modal/Modal';
import AddQuestionForm from './AddQuestionForm';
import { clearTriviaQuestionsFromState, setTriviaId } from '../../redux/reducers/createGameSlice';
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';

const {
  bar,
  bars,
  barContainer,
  bigRec,
  create,
  logo,
  selected,
  start,
  title,
  triangle,
  upload,
} = styles;

export type Question = {
  id: number,
  triviaId?: number, 
  roundNum?: number, 
  questionNum?: number, 
  content?: string, 
  type?: string,
  correctAnswer?: string,
}

//handle row deletion
export default function CreateGame(props) {
  const {currentGameId, roundsAndQuestions, session} = props
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [rounds, setRounds] = useState([]);
  const [openRoundNumber, setOpenRoundNumber] = useState(null);
  const [triviaQuestions, setTriviaQuestions] = useState(null);
  const newQuestion = useAppSelector(state => state.createGame.newQuestion);
  const editedQuestion = useAppSelector(state => state.createGame.editedQuestion);
  const triviaId = useAppSelector(state => state.createGame.triviaId);
  const joinCode = router.query.joinCode;
  useEffect(() => {
    if (roundsAndQuestions?.length && !triviaQuestions) {
      const questions = roundsAndQuestions.reduce((questionArr, round) => {
        console.log(round)
        return [...questionArr, ...round.questions]
      }, [])
      setTriviaQuestions(questions);
      setNumberOfRounds(roundsAndQuestions.length);
      setRounds(roundsAndQuestions);
      console.log('checking reduce lmao', {questions})
    } else {
      setTriviaQuestions([])
    }
  }, [])
  // useEffect(() => {
  //   if (questions?.length && !triviaQuestions) {
  //     setTriviaQuestions(questions);
  //   } else {
  //     setTriviaQuestions([])
  //   }
  //   dispatch(setTriviaId(currentGameId))
  // }, []);
  console.log({roundsAndQuestions, triviaQuestions})
  useEffect(() => {
    if (newQuestion) {
      displayNewTriviaQuestion(newQuestion);
    } else if (editedQuestion) {
      displayEditedTriviaQuestion(editedQuestion);
    }
    dispatch(clearTriviaQuestionsFromState());
  }, [newQuestion, editedQuestion]);

  const openOrCloseRound = (i) => {
    if (openRoundNumber === i) {
      setOpenRoundNumber(null);
    } else {
      setOpenRoundNumber(i);
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
   // <div>
    <div id={create}>
      <div id={title}>
        <p>Create</p>
      </div>
      <div id={start}>
        <Link href={`/game/${joinCode}/lobby`}>
          <p>Start Game</p>
        </Link>
      </div>
      <div id={upload}>
        <p>Upload</p>
      </div>
      <div id={bigRec}>
        <div id={bars}>
          {rounds?.length > 0
            ? rounds.map((round, i) => (
                <RoundHeaders
                  key={round.id}
                  openRoundNumber={openRoundNumber}
                  questions={round.questions}
                  onClick={() => openOrCloseRound(i)}
                  selected={openRoundNumber === i ? true : false}
                  roundNum={i + 1}
                />
              ))
            : null}
          
          <div className={barContainer}>
            <div
              className={openRoundNumber === numberOfRounds + 1  ? `${bar} ${selected}` : bar}
              onClick={() => {
                const roundsCopy = rounds.slice();
                roundsCopy.push({
                    id: rounds[rounds.length - 1].id++,
                    roundNum: numberOfRounds + 1,
                    hasBeenScored: false, 
                    triviaId: currentGameId,
                    questions: [],
                })
                setRounds(roundsCopy);
                setNumberOfRounds(numberOfRounds + 1);
              }}
            >
              <div
                className={
                  openRoundNumber === numberOfRounds + 1 ? `${triangle} ${selected}` : triangle
                }
              >
              <p>Create Round</p>
            </div>
            {/* {props.selected ? (
              <Questions
                questionNumberList={[1, 2, 3, 4, 5]}
                currentRound={props.openRoundNumber}
                questions={props.questions}
              />
            ) : null} */}
          </div>

        </div>
      </div>
      <div>
        <p id={logo}>it's a trivia&trade;</p>
      </div>
      <Modal selector="#modal">
        <AddQuestionForm />
      </Modal>
    </div>
    </div>
  );
}
