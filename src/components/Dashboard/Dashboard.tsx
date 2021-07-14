// @ts-check
import * as React from 'react';
const {useEffect, useState} = React;
import { signOut } from "next-auth/client";
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from "../../styles/Home.module.css";
import {logoutUser, fetchUserDisplayName, updateUserDisplayName} from '../../redux/reducers/userSlice';
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
import { DashboardProps } from '../../../pages/dashboard';
import PlayGameSection from './PlayGameSection'
import CreateGameSection from './CreateGameSection'
import DraftGames from './DraftGames'

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

const Dashboard: React.FC <DashboardProps> = (props) => {
  const dispatch = useAppDispatch()
  const {draftGames, session} = props
  const [userIsChangingDisplayName, setUserIsChangingDisplayName] =
    useState(false)
  const [displayName, setDisplayName] = useState('')
  const userDisplayName = useAppSelector((state) => state.user.userDisplayName)
  const userId = useAppSelector((state) => state.user.userId)
  useEffect(() => {
    if (session && !userId) {
      dispatch(fetchUserDisplayName(session));
    }
  }, []);
  const submitNewDisplayName = () => {
    dispatch(updateUserDisplayName({displayName, userId}));
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
              You look beautiful today{" "}
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
          
          {draftGames ? <DraftGames draftGames={draftGames}/> : null}

          <div className={buttonContainer}>
            <CreateGameSection />
            <div className={divider}></div>
            <PlayGameSection />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;