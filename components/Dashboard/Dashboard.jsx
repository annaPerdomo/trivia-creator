import React, {useEffect, useState} from 'react';
import { signOut, useSession } from "next-auth/client";
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from "../../styles/Home.module.css";
import {logoutUser, setUserToState, updateUserDisplayName} from '../../redux/actions/UserActions';
const {
  buttonContainer,
  buttonSection,
  container,
  divider,
  homePageButtons,
  welcomeBanner,
  signInButtonContainer,
  signOutButtonContainer
} = styles;

export default function Dashboard() {
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [joinGameCode, setJoinGameCode] = useState('');
  const [userIsChangingDisplayName, setUserIsChangingDisplayName] =
    useState(false);
  const [displayName, setDisplayName] = useState('');
  const userDisplayName = useSelector((state) => state.user.userDisplayName);
  const userId = useSelector((state) => state.user.userId);
  useEffect(() => {
    if (session && !userId) {
      dispatch(setUserToState(session));
    }
  }, []);
  const submitNewDisplayName = () => {
    dispatch(updateUserDisplayName(displayName));
    setDisplayName(null);
    setUserIsChangingDisplayName(false);
  };
  const initiateSignOut = () => {
    signOut();
    dispatch(logoutUser());
  };
  return (
    <div className={container}>
      <div className={welcomeBanner}>
        <h1>Welcome to your Dashboard!</h1>
      </div>
      {session ? (
        <div>
          <div>
            <h4>
              You look beautiful today{' '}
              {userDisplayName || session.user.name || session.user.email}
            </h4>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setUserIsChangingDisplayName(true)}
            >
              Change display name
            </button>
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
          <div className={signOutButtonContainer}>
            <button type="button" onClick={initiateSignOut}>
              Sign out
            </button>
          </div>

          <div className={buttonContainer}>
            <div className={buttonSection}>
              <Link href="/create">
                <button className={homePageButtons}>Create A Game</button>
              </Link>
            </div>
            <div className={divider}></div>
            <div className={buttonSection}>
              {isJoiningGame ? (
                <div>
                  <input
                    type="text"
                    name="joinGameCode"
                    value={joinGameCode}
                    onChange={(e) => setJoinGameCode(e.target.value)}
                  ></input>
                </div>
              ) : null}
              <button
                className={homePageButtons}
                onClick={() => setIsJoiningGame(true)}
              >
                {isJoiningGame ? 'Enter Game Code' : 'Play A Game'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}