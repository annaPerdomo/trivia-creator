import { combineReducers } from 'redux'
import * as types from "./types.js";

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1
    case types.DECREMENT:
      return state - 1
    case types.RESET:
      return 0
    default:
      return state
  }
}

// INITIAL TIMER STATE
const initialTimerState = {
  lastUpdate: 0,
  light: false,
}

// TIMER REDUCER
const timerReducer = (state = initialTimerState, { type, payload }) => {
  switch (type) {
    case types.TICK:
      return {
        lastUpdate: payload.ts,
        light: !!payload.light,
      }
    default:
      return state
  }
}

//from original setup
// const main = (state = {
//   name: "guest",
// }, action) => {
// switch(action.type){
//   case type.SET_NAME:
//     return {
//       ...state,
//       name: action.payload
//     };
//   default:
//     return {...state};
//   }
// }

// export default main;

const initialMainState = {
  name: 'guest'
}

const mainReducer = (state = initialMainState, {type, payload}) => {
  switch (type) {
    case types.SET_NAME:
      return {
        ...state,
        name: payload.name
      };
    default:
      return {...state};
  }
}

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  timer: timerReducer,
  main: mainReducer,
}

export default combineReducers(reducers)
