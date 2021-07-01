import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
import {closeQuestionModal, createTriviaQuestion} from '../../redux/reducers/createGameSlice';
import styles from '../../styles/Create.module.css';
const {backdrop, modal} = styles;

function AddQuestionForm() {
  const dispatch = useAppDispatch();
  const currentQuestion = useAppSelector(
    (state) => state.createGame.currentQuestion
  );
  const currentAnswer = useAppSelector((state) => state.createGame.currentAnswer);
  const currentType = useAppSelector((state) => state.createGame.currentType);
  const [question, setQuestion] = useState(
    currentQuestion ? currentQuestion : ''
  );
  const [answer, setAnswer] = useState(currentAnswer ? currentAnswer : '');
  const [type, setType] = useState(currentType ? currentType : '');
  const roundNum = useAppSelector((state) => state.createGame.roundNum);
  const questionNum = useAppSelector((state) => state.createGame.questionNum);
  const triviaId = useAppSelector((state) => state.createGame.triviaId);
  const questionId = useAppSelector((state) => state.createGame.questionId);
  const submitQuestion = async (e) => {
    e.preventDefault();
    const newQuestionData = {
      content: question,
      correctAnswer: answer,
      questionId,
      questionNum,
      roundNum,
      triviaId,
      type: type || 'text',
    };
    dispatch(createTriviaQuestion(newQuestionData));
  };
  const closeModal = () => {
    dispatch(closeQuestionModal());
  };
  return (
    <div className={backdrop}>
      <div className={modal}>
        <h5>Round {roundNum} Question {questionNum}</h5>
        <form>
          <div>
            <label htmlFor="question">Question: </label>
            <input
              type="text"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="answer">Answer: </label>
            <input
              type="text"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="type-select">Type: </label>
            <select
              defaultValue={type ? type : false}
              id="type-select"
              name="type"
              onChange={(e) => setType(e.currentTarget.value)}
            >
              <option value="">--Please choose one--</option>
              <option value="text">Text</option>
              <option value="visual">Visual</option>
              <option value="audio">Audio</option>
            </select>
          </div>
          <br />
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
  );
}

export default AddQuestionForm;

