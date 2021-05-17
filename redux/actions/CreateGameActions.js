import * as types from '../types';

export const openQuestionModal = ({ roundNum, questionNum }) => (dispatch) => {
  dispatch({
    type: types.OPEN_QUESTION_MODAL,
    payload: { roundNum, questionNum },
  });
};

export const closeQuestionModal = () => ({ type: types.CLOSE_QUESTION_MODAL });

export const createTriviaQuestion = (question, answer) => async (dispatch, getState) => {
  const roundNum = getState().createGame.roundNum;
  const questionNum = getState().createGame.questionNum;

  const newQuestionData = {
    triviaId: 3,
    roundNum,
    questionNum,
    content: question,
    type: 'text',
    correctAnswer: answer
 }
 await fetch('http://localhost:3000/api/post/questions', {
    method: 'PUT',
    headers: {
       'Content-Type': 'application/json'
    },
    body: JSON.stringify(newQuestionData)
  })

  dispatch(closeQuestionModal());
}
