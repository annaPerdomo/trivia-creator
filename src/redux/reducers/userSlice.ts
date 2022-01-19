import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Session } from "next-auth";

interface UserState {
  userId: string | null;
  userDisplayName: string | null;
}

const initialState: UserState = {
  userId: null,
  userDisplayName: null
}

interface UserIdAndDisplayName {
  userId?: string, 
  displayName?: string
}

export const fetchUserDisplayName = createAsyncThunk('user/setUserToState',
  async (userData: Session) => {
    try {
      const { user } = userData;
      const getUserDisplayName = await fetch('/api/get/userDisplayName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user.id),
      });
      const userDisplayName = await getUserDisplayName.json();
      return { displayName: userDisplayName.displayName, userId: user.id } as UserIdAndDisplayName
    } catch (err) {
      if (err) console.log(err)
    }
  })

export const updateUserDisplayName = createAsyncThunk('user/updateUserDisplayName',
  async (userData: UserIdAndDisplayName) => {
    try {
      const { displayName, userId } = userData;
      const setNewDisplayName = await fetch('/api/update/displayName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ displayName, userId: Number(userId) }),
      });
      const newDisplayName = await setNewDisplayName.json();
      return { displayName } as UserIdAndDisplayName;
    } catch (err) {
      if (err) console.log(err)
    }
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.userDisplayName = action.payload
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    logoutUser: (state) => {
      state.userId = null;
      state.userDisplayName = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserDisplayName.fulfilled, (state, action: PayloadAction<UserIdAndDisplayName>) => {
      const { userId, displayName } = action.payload
      state.userId = userId
      if (displayName) {
        state.userDisplayName = displayName
      }
    }),
      builder.addCase(updateUserDisplayName.fulfilled,
        (state, action: PayloadAction<UserIdAndDisplayName>) => {
          const { displayName } = action.payload
          state.userDisplayName = displayName
        })
  }
})

export const {setDisplayName, setUserId, logoutUser} = userSlice.actions
