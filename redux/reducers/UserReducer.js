import * as types from "../types";

const UserReducer = (
  state = {
    userId: null,
    userDisplayName: null,
  }, {type, payload}) => {
    switch (type) {
      case types.SET_USER_ID:
        return {
          ...state,
          userId: payload.userId,
        }
        case types.SET_USER_DISPLAY_NAME:
          return {
            ...state,
            userDisplayName: payload.userDisplayName,
          }
        case types.LOGOUT_USER:
          return {
            ...state,
            userId: null,
            userDisplayName: null
          }
      default:
        return state;
    }
}

export default UserReducer;