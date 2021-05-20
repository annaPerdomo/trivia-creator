import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import {closeQuestionModal, createTriviaQuestion} from '../../redux/actions/CreateGameActions';
import styles from '../../styles/Create.module.css';
const {backdrop, modal} = styles;

function AddQuestionForm() {
  const dispatch = useDispatch();
  const currentQuestion = useSelector(state => state.createGame.currentQuestion);
  const currentAnswer = useSelector(state => state.createGame.currentAnswer);
  const currentType = useSelector(state => state.createGame.currentType);
  const [question, setQuestion] = useState(currentQuestion ? currentQuestion : "");
  const [answer, setAnswer] = useState(currentAnswer ? currentAnswer :  "");
  const [type, setType] = useState(currentType ? currentType :  "");
  const roundNum = useSelector(state => state.createGame.roundNum);
  const questionNum = useSelector(state => state.createGame.questionNum);
  const triviaId = useSelector(state => state.createGame.triviaId);
  const questionId = useSelector(state => state.createGame.questionId);
  const submitQuestion = async (e) => {
    e.preventDefault();
    const newQuestionData = {
      content: question,
      correctAnswer: answer,
      questionId,
      questionNum,
      roundNum,
      triviaId,
      type,
    }
    dispatch(createTriviaQuestion(newQuestionData));
 }
 const closeModal = () => {
   dispatch(closeQuestionModal());
 }
 console.log({type})
  return (
    <div className={backdrop}>
      <div className={modal}>
        <form>
          <div>
            <label for="question">Question: </label>
            <input
              type="text"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></input>
          </div>
          <div>
            <label for="answer">Answer: </label>
            <input
              type="text"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              ></input>
          </div>
          <div>
            <label for="type-select">Type: </label>
            <select
              id="type-select"
              name="type"
              onChange={(e) => setType(e.currentTarget.value)}
            >
              <option value="">--Please choose one--</option>
              <option selected={type === 'text'} value="text">Text</option>
              <option selected={type === 'visual'} value="visual">Visual</option>
              <option selected={type === 'audio'} value="audio">Audio</option>
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
  );
}

export default AddQuestionForm;

//The code below is needed if you aren't using useSelector and useDispatch because it maps the state and the function to dispatch
// const mapStateToProps = state => {
//   return { name: state.main.name }
//  }
//  const mapDispatchToProps = {
//    setInfo
//  }
//  export default connect(mapStateToProps, mapDispatchToProps)(AddQuestionForm);

