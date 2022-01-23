// @ts-check
import * as React from "react";
import { signOut } from "next-auth/client";

import { DashboardProps } from "../../../pages/dashboard";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

import {
  logoutUser,
  fetchUserDisplayName,
} from "../../redux/reducers/userSlice";
import commonStyles from "../../styles/CommonStyles.module.css";
import styles from "../../styles/Home.module.css";

import CreateGameSection from "./CreateGameSection";
import DisplayNameSection from "./DisplayNameSection";
import DraftGames from "./DraftGames";
import PlayGameSection from "./PlayGameSection";

const { centeredHeader, noMargin } = commonStyles;

const {
  container,
  dashboardActionsContainer,
  dashboardContainer,
  dashboardContent,
  divider,
  greetingContainer,
  headerContainer,
  signOutButtonContainer,
} = styles;

const Dashboard: React.FC<DashboardProps> = ({ draftGames, session }) => {
  const dispatch = useAppDispatch();

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
          <h5 className={noMargin}>Welcome to your&nbsp;</h5>
          <h2 className={noMargin}>DASHBOARD</h2>
        </div>

        <DisplayNameSection />

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
              <CreateGameSection />

              <PlayGameSection />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
