// @ts-check
import * as React from "react";
import { signOut } from "next-auth/client";

import { DashboardProps } from "../../../pages/dashboard";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

import {
  logoutUser,
  fetchUserDisplayName,
} from "../../redux/reducers/userSlice";
import styles from "../../styles/Home.module.css";

import ChangeDisplayNameSection from "./ChangeDisplayNameSection";
import CreateGameSection from "./CreateGameSection";
import DraftGames from "./DraftGames";
import PlayGameSection from "./PlayGameSection";

const {
  centeredHeader,
  container,
  createGameContainer,
  dashboardActionsContainer,
  dashboardContainer,
  dashboardContent,
  divider,
  greetingContainer,
  headerContainer,
  noMargin,
  playGameContainer,
  signOutButtonContainer,
} = styles;

const Dashboard: React.FC<DashboardProps> = (props) => {
  const dispatch = useAppDispatch();

  const { draftGames, session } = props;

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
      <div className={headerContainer}>

        <div className={`${centeredHeader} ${dashboardContainer}`}>
            <h3 className={noMargin}>Welcome to your&nbsp;</h3>
            <h2 className={noMargin}>DASHBOARD</h2>
        </div>

        <div className={`${centeredHeader} ${greetingContainer}`}>
          <h4 className={noMargin}>
            Hi&nbsp;
            {userDisplayName || session.user.name || session.user.email}
          </h4>
        </div>

        <ChangeDisplayNameSection />
      </div>

      {session && (
        <>
          <div className={signOutButtonContainer}>
            <button type="button" onClick={initiateSignOut}>
              Sign out
            </button>
          </div>

          <div className={dashboardContent}>
            {draftGames && <DraftGames draftGames={draftGames} />}

            <div className={dashboardActionsContainer}>
              <div className={createGameContainer}>
                <CreateGameSection />
              </div>

              <div className={playGameContainer}>
                <PlayGameSection />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
