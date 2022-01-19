import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
// import type { Session } from "next-auth";

const initialState = {
  triviaId: null,
  userId: null,
  isGameHost: false,
  teamId: null,
  teamName: null
}

export const createTriviaTeam = createAsyncThunk('playGame/createTriviaTeam', async (triviaTeam) => {
  try {
    const newTriviaTeam = await fetch(
      '/api/create/team',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(triviaTeam),
      }
    )
    return newTriviaTeam.json();
  } catch (err) {
    if (err) console.log(err)
  }
})

export const playGameSlice = createSlice({
  name: 'playGame', 
  initialState,
  reducers: {
    setGame: (state, action) => {
      const {hostId, userId, triviaId} = action.payload
      state.userId = userId
      state.triviaId = triviaId
      state.isGameHost = userId === hostId
    },
    setTeam: (state, action) => {
      const {teamId, teamName} = action.payload
      if (state.teamId !== teamId) {
        state.teamId = teamId
        state.teamName = teamName
      }
    }, 
    removeTeam: (state, action) => {
      state.teamId = null
      state.teamName = null
    }, 
    deleteSelfFromTeam: (state, action) => {
      const {deletedTeamId} = action.payload
      if (state.teamId === deletedTeamId) {
        state.teamId = null
        state.teamName = null
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(createTriviaTeam.fulfilled, (state, action) => {
      const {id, teamName} = action.payload
      state.teamId = id
      state.teamName = teamName
    })
  }
})

export const {deleteSelfFromTeam, removeTeam, setGame, setTeam} = playGameSlice.actions