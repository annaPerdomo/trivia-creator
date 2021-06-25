import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { userSlice }from './reducers/userSlice'
import { createGameSlice } from './reducers/createGameSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      createGame: createGameSlice.reducer,
    }
  })
}

const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store;
