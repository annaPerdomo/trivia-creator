import * as types from '../types';

export const setTriviaId = (triviaId) => ({
  type: types.SET_TRIVIA_ID,
  payload: {triviaId}
});

export const openQuestionModal =
  ({ roundNum, questionNum, questionId }) =>
  (dispatch) => {
    dispatch({
      type: types.OPEN_QUESTION_MODAL,
      payload: { roundNum, questionNum, questionId },
    });
  };

export const closeQuestionModal = () => ({ type: types.CLOSE_QUESTION_MODAL });

export const addTriviaQuestionToState = ({newQuestion}) => ({
  type: types.SET_NEW_QUESTION,
  payload: {newQuestion}
});

export const clearTriviaQuestionsFromState = () => ({
  type: types.UNSET_NEW_QUESTION,
});

export const createTriviaQuestion =
  (newQuestionData) => async (dispatch, getState) => {
    await fetch('http://localhost:3000/api/post/questions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestionData),
    });
    // grab new id from db and dispatch it here
    dispatch(closeQuestionModal());
  };
