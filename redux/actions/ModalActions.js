import * as types from '../types';

export const openQuestionModal = ({ roundNum, questionNum }) => (dispatch) => {
  dispatch({
    type: types.OPEN_QUESTION_MODAL,
    payload: { roundNum, questionNum },
  });
};

export const closeQuestionModal = () => ({ type: types.CLOSE_QUESTION_MODAL });
