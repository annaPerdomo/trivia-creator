
// import { useMemo } from 'react'
// import { AnyAction, createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunkMiddleware, { ThunkAction } from 'redux-thunk'
// import rootReducer from './reducers/rootReducer'

// let store

// function initStore(initialState) {
//   return createStore(
//     rootReducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   )
// }

// export const initializeStore = (preloadedState) => {
//   let _store = store ?? initStore(preloadedState)

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     })
//     // Reset the current store
//     store = undefined
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store
//   // Create the store once in the client
//   if (!store) store = _store

//   return _store
// }

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState])
//   return store
// }


import { configureStore } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { AnyAction} from 'redux'

import { userSlice }from './reducers/userSlice'
//import CreateGameReducer from './reducers/CreateGameReducer'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    //createGame: CreateGameReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

export default store