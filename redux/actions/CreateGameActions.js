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

export const addTriviaQuestionToState = (newQuestion) => ({
  type: types.SET_NEW_QUESTION,
  payload: newQuestion
});

export const clearTriviaQuestionsFromState = () => ({
  type: types.UNSET_NEW_QUESTION,
});

export const createTriviaQuestion =
  (newQuestionData) => async (dispatch, getState) => {
    console.log('NEW QUESTION DATA', {newQuestionData});
    if (!newQuestionData.triviaId) {
      const newTriviaGame = await fetch('http://localhost:3000/api/create/triviaGame', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestionData)
      })
      dispatch(closeQuestionModal());
    } else if (!newQuestionData.questionId) {
      const newQuestion = await fetch('http://localhost:3000/api/create/questions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestionData),
      });
      const newQuestionBody = await newQuestion.json();
      dispatch(addTriviaQuestionToState(newQuestionBody))
      dispatch(closeQuestionModal());
    } else {
      const editedQuestion = await fetch('http://localhost:3000/api/update/questions')
      dispatch(closeQuestionModal());
    }

    // grab new id from db and dispatch it here

  };
