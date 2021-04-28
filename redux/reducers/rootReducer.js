import ModalReducer from './ModalReducer';
import { combineReducers } from 'redux'

const reducers = {
  modal: ModalReducer,
}

export default combineReducers(reducers)
