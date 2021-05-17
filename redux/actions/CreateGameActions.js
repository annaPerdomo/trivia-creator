import * as types from '../types';

export const openQuestionModal = ({ roundNum, questionNum }) => (dispatch) => {
  dispatch({
    type: types.OPEN_QUESTION_MODAL,
    payload: { roundNum, questionNum },
  });
};

export const closeQuestionModal = () => ({ type: types.CLOSE_QUESTION_MODAL });

export const createTriviaQuestion =
  (newQuestionData) => async (dispatch, getState) => {
    await fetch('http://localhost:3000/api/post/questions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestionData),
    });

    dispatch(closeQuestionModal());
  };
