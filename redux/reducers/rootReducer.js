import CreateGameReducer from './CreateGameReducer';
import UserReducer from './UserReducer';
import { combineReducers } from 'redux'

const reducers = {
  user: UserReducer,
  createGame: CreateGameReducer,
}

export default combineReducers(reducers)
