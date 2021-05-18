import * as types from "../types";

const CreateGameReducer = (
  state = {
    triviaId: null,
    isAddQuestionModalOpen: false,
    modalType: null,
    roundNum: null,
    questionNum: null,
    isUpdatingQuestion: false,
    questionId: null,
    newQuestion: null,
  }, {type, payload}) => {
    switch (type) {
      case types.SET_TRIVIA_ID:
        return {
          ...state,
          triviaId: payload.triviaId
        }
      case types.OPEN_QUESTION_MODAL:
        return {
          ...state,
          isAddQuestionModalOpen: true,
          modalType: 'questionModal',
          roundNum: payload.roundNum,
          questionNum: payload.questionNum,
          questionId: payload.questionId,
        }
      case types.CLOSE_QUESTION_MODAL:
        return {
          ...state,
          isAddQuestionModalOpen: false,
          modalType: null,
          roundNum: null,
          questionNum: null,
          questionId: null,
        }
      case types.SET_NEW_QUESTION:
        return {
          ...state,
          newQuestion: payload
        }
      case types.UNSET_NEW_QUESTION:
        return {
          ...state,
          newQuestion: null
        }
      default:
        return state;
    }
}

export default CreateGameReducer;