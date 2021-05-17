import CreateGameReducer from './CreateGameReducer';
import { combineReducers } from 'redux'

const reducers = {
  createGame: CreateGameReducer,
}

export default combineReducers(reducers)
