import * as types from '../types';

export const setTriviaId = (triviaId) => ({
  type: types.SET_TRIVIA_ID,
  payload: {triviaId}
});

export const openQuestionModal =
  ({ roundNum, questionNum, questionId, currentQuestion, currentAnswer }) =>
  (dispatch) => {
    dispatch({
      type: types.OPEN_QUESTION_MODAL,
      payload: {
        roundNum,
        questionNum,
        questionId,
        currentQuestion,
        currentAnswer,
      },
    });
  };

export const closeQuestionModal = () => ({ type: types.CLOSE_QUESTION_MODAL });

export const addTriviaQuestionToState = (newQuestion) => ({
  type: types.SET_NEW_QUESTION,
  payload: newQuestion
});

export const addEditedQuestionToState = (editedQuestion) => ({
  type: types.SET_EDITED_QUESTION,
  payload: editedQuestion,
});

export const clearTriviaQuestionsFromState = () => ({
  type: types.UNSET_QUESTIONS,
});

export const createTriviaQuestion =
  (newQuestionData) => async (dispatch, getState) => {
    console.log('create Trivia Question!', newQuestionData, typeof newQuestionData);
    try {
      if (!newQuestionData.triviaId) {
        const newTriviaGame = await fetch(
          '/api/create/triviaGame',
          {
            method: 'POST',
            body: JSON.stringify(newQuestionData),
          }
        );
        //dispatch triviaID and question
        dispatch(closeQuestionModal());
      } else if (!newQuestionData.questionId) {
        const newQuestion = await fetch(
          '/api/create/questions',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuestionData),
          }
        );
        const newQuestionBody = await newQuestion.json();
        dispatch(addTriviaQuestionToState(newQuestionBody));
        dispatch(closeQuestionModal());
      } else {
        const editedQuestion = await fetch(
          '/api/update/questions',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuestionData),
          }
        );
        const editedQuestionBody = await editedQuestion.json();
        console.log('EDITED QUESTION', { editedQuestionBody });
        dispatch(addEditedQuestionToState(editedQuestionBody));
        dispatch(closeQuestionModal());
      }
      console.log('NEW QUESTION DATA', { newQuestionData });
    } catch (err) {
      if (err) {
        console.log('something went wrong with fetching!', err);
      }
    }
  };
