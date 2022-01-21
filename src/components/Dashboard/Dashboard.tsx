// @ts-check
import * as React from 'react';
import { signOut } from "next-auth/client";

import { DashboardProps } from '../../../pages/dashboard';
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';

import { logoutUser, fetchUserDisplayName } from '../../redux/reducers/userSlice';
import styles from "../../styles/Home.module.css";

import ChangeDisplayNameSection from './ChangeDisplayNameSection';
import CreateGameSection from './CreateGameSection';
import DraftGames from './DraftGames';
import PlayGameSection from './PlayGameSection';

const {
  container,
  dashboardContainer,
  buttonContainer,
  divider,
  welcomeBanner,
  signOutButtonContainer
} = styles;

const Dashboard: React.FC <DashboardProps> = (props) => {
  const dispatch = useAppDispatch();

  const {draftGames, session} = props;

  const userDisplayName = useAppSelector((state) => state.user.userDisplayName);
  const userId = useAppSelector((state) => state.user.userId);

  React.useEffect((): void => {
    if (session && !userId) {
      dispatch(fetchUserDisplayName(session));
    }
  }, []);

  const initiateSignOut = (): void => {
    signOut();
    dispatch(logoutUser());
  };

  return (
    <div className={container}>

      <div>
        <div className={welcomeBanner}>
          <h1>Welcome to your Dashboard!</h1>
        </div>

        <div>
          <h4>
            You look beautiful today{" "}
            {userDisplayName || session.user.name || session.user.email}
          </h4>
        </div>

        <ChangeDisplayNameSection />
      </div>

      {session && (
        <div>

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
      )}
    </div>
  );
}

export default Dashboard;