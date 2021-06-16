import * as types from '../types';
import { signin, signIn, signOut, useSession } from "next-auth/client";

export const setDisplayName = (userDisplayName) => ({
  type: types.SET_USER_DISPLAY_NAME,
  payload: {
    userDisplayName
  }
});

export const setUserId = (userId) => ({
  type: types.SET_USER_ID,
  payload: { userId },
});

export const setUserToState =
  (data) => async (dispatch, getState) => {
    try {
      const {user} = data;
      console.log('setUserToState', {user});
      const getUserDisplayName = await fetch('/api/get/userDisplayName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user.id),
      });
      const userDisplayName = await getUserDisplayName.json();
      console.log({userDisplayName});
      dispatch(setUserId(user.id))
      if (userDisplayName.displayName) {
        dispatch(setDisplayName(userDisplayName.displayName))
      }
      //make fetch request to grab user display name
      //set displayName and set UserID
    } catch (err) {
      if (err) console.log(err);
    }
  }

export const updateUserDisplayName =
  (displayName) => async (dispatch, getState) => {
    try {
      const userId = getState().user.userId;
      const setNewDisplayName = await fetch('/api/update/displayName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({displayName, userId}),
      });
      const newDisplayName = await setNewDisplayName.json();
      console.log({newDisplayName});
      dispatch(setDisplayName(displayName));
    } catch (err) {
      if (err) console.log(err);
    }
  }

  export const logoutUser = () => ({
    type: types.LOGOUT_USER,
  });