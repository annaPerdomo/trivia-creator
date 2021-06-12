import * as types from "../types";

const UserReducer = (
  state = {
    userId: null,
    preferredName: null,
  }, {type, payload}) => {
    switch (type) {
      case types.SET_USER:
        return {
          ...state,
          userId: payload.userId,
          preferredName: payload.preferredName
        }
        case types.LOGOUT_USER:
          return {
            ...state,
            userId: null,
            preferredName: null
          }
      default:
        return state;
    }
}

export default UserReducer;