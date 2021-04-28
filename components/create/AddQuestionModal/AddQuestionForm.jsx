import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { connect } from "react-redux";
import styles from '../../../styles/Create.module.css';
const {backdrop, modal} = styles;

function AddQuestionForm({closeModal}) {
  const dispatch = useDispatch();
  const [newName, setName] = useState("");
  const submitQuestion = async (e) => {
    e.preventDefault();
    //dispatch(setInfo(newName))

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
            <label for="question">Question or Name: </label>
            <input
              type="text"
              name="question"
              value={newName}
              onChange={(e) => setName(e.target.value)}
            ></input>
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

