// @ts-check
import * as React from 'react';
const {useState} = React;
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
import {updateUserDisplayName} from '../../redux/reducers/userSlice';

const ChangeDisplayNameSection = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const [userIsChangingDisplayName, setUserIsChangingDisplayName] =
    useState(false);
  const [displayName, setDisplayName] = useState("");
  const submitNewDisplayName = () => {
    dispatch(updateUserDisplayName({ displayName, userId }));
    setDisplayName(null);
    setUserIsChangingDisplayName(false);
  };
  return (
    <div>
      <div>
        {userIsChangingDisplayName ? (
          <button
            type="button"
            onClick={() => setUserIsChangingDisplayName(false)}
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setUserIsChangingDisplayName(true)}
          >
            Change display name
          </button>
        )}
      </div>
      {userIsChangingDisplayName ? (
        <div>
          <label htmlFor="newDisplayName">New Display Name: </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          ></input>
          <button type="button" onClick={submitNewDisplayName}>
            Submit new display name
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ChangeDisplayNameSection;