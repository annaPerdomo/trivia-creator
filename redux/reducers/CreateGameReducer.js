import * as types from "../types";

const CreateGameReducer = (
  state = {
    triviaId: null,
    isAddQuestionModalOpen: false,
    modalType: null,
    roundNum: null,
    questionNum: null,
    questionId: null,
    currentQuestion: null,
    currentAnswer: null,
    newQuestion: null,
    editedQuestion: null,
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
          currentQuestion: payload.currentQuestion,
          currentAnswer: payload.currentAnswer,
        }
      case types.CLOSE_QUESTION_MODAL:
        return {
          ...state,
          isAddQuestionModalOpen: false,
          modalType: null,
          roundNum: null,
          questionNum: null,
          questionId: null,
          currentQuestion: null,
          currentAnswer: null,
        }
      case types.SET_NEW_QUESTION:
        return {
          ...state,
          newQuestion: payload,
        }
      case types.SET_EDITED_QUESTION:
        return {
          ...state,
          editedQuestion: payload,
        }
      case types.UNSET_QUESTIONS:
        return {
          ...state,
          newQuestion: null,
          editedQuestion: null,
        }
      default:
        return state;
    }
}

export default CreateGameReducer;