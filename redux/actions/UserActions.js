import * as types from '../types';
import { signin, signIn, signOut, useSession } from "next-auth/client";

export const setDisplayName = ({userDisplayName}) => ({
  type: types.SET_USER_DISPLAY_NAME,
  payload: {
    userDisplayName
  }
});

export const setUserId = ({ userId }) => ({
  type: types.SET_USER_ID,
  payload: { userId },
});

export const setUserToState =
  (user) => async (dispatch, getState) => {
    try {
      console.log('setUserToState', {user});
      const getUserDisplayName = await fetch('/api/get/userDisplayName', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      });
      const userDisplayName = await getUserDisplayName.json();
      console.log({userDisplayName});
      dispatch(setUserId(user.id))
      if (userDisplayName) {
        dispatch(setDisplayName(userDisplayName))
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
      const setDisplayName = await fetch('/api/update/displayName', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({displayName, userId}),
      });
      const newDisplayName = await setDisplayName.json();
      console.log({newDisplayName});
      dispatch(setDisplayName(newDisplayName));
    } catch (err) {
      if (err) console.log(err);
    }
  }