const ModalReducer = (
  state = {
    isModalOpen: false,
    modalType: null,
    roundNum: null,
    questionNum: null
  }, {type, payload}) => {
    switch (type) {
      case type.OPEN_QUESTION_MODAL:
        return {
          isModalOpen: true,
          modalType: 'questionModal',
          roundNum: payload.roundNum,
          questionNum: payload.questionNum
        }
      case type.CLOSE_QUESTION_MODAL:
        return {
          isModalOpen: false,
          modalType: null,
          roundNum: null,
          questionNum: null
        }
      default:
        return state;
    }
}

export default ModalReducer;