import * as types from "../types";

const CreateGameReducer = (
  state = {
    isAddQuestionModalOpen: false,
    modalType: null,
    roundNum: null,
    questionNum: null
  }, {type, payload}) => {
    switch (type) {
      case types.OPEN_QUESTION_MODAL:
        return {
          isAddQuestionModalOpen: true,
          modalType: 'questionModal',
          roundNum: payload.roundNum,
          questionNum: payload.questionNum
        }
      case types.CLOSE_QUESTION_MODAL:
        return {
          isAddQuestionModalOpen: false,
          modalType: null,
          roundNum: null,
          questionNum: null
        }
      default:
        return state;
    }
}

export default CreateGameReducer;