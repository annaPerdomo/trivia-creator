import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import {closeQuestionModal, createTriviaQuestion} from '../../redux/actions/CreateGameActions';
import styles from '../../styles/Create.module.css';
const {backdrop, modal} = styles;

function AddQuestionForm({displayNewTriviaQuestion}) {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const roundNum = useSelector(state => state.createGame.roundNum);
  const questionNum = useSelector(state => state.createGame.questionNum);
  const submitQuestion = async (e) => {
    e.preventDefault();
    const newQuestionData = {
      content: question,
      correctAnswer: answer,
      id: Number(`${roundNum}${questionNum}`),
      triviaId: 3,
      type: "text",
      roundNum,
      questionNum
    }
    displayNewTriviaQuestion(newQuestionData);
    dispatch(createTriviaQuestion(newQuestionData));
 }
 const closeModal = () => {
   dispatch(closeQuestionModal());
 }
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

