import { RootState } from './../store'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"


interface UserState {
  userId: string | null,
  userDisplayName: string | null
}

const initialState: UserState = {
  userId: null,
  userDisplayName: null
}

interface NextAuthSession {
  user: {
    email?: string,
    id: string, 
    image?: string,
    name?: string
  }
}

interface FetchDisplayNamePayload {
  userId: string, 
  displayName?: string
}

export const fetchUserDisplayName = createAsyncThunk('user/setUserToState', async (userData: NextAuthSession) => {
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
    return { displayName: userDisplayName.displayName, userId: user.id } as FetchDisplayNamePayload
  } catch (err) {
    if (err) console.log(err)
  }
})

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
    extraReducers: builder => {
      builder.addCase(fetchUserDisplayName.fulfilled, (state, action: PayloadAction<FetchDisplayNamePayload>) => {
          const {userId, displayName} = action.payload
          state.userId = userId
          if (displayName) {
            state.userDisplayName = displayName
          }
        })
    }
  }
})