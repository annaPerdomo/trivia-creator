// @ts-check
import * as React from 'react';
const {useEffect, useState} = React;
import { signOut } from "next-auth/client";
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from "../../styles/Home.module.css";
import {logoutUser, fetchUserDisplayName, updateUserDisplayName} from '../../redux/reducers/userSlice';
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
import { DashboardProps, DraftGames } from '../../../pages/dashboard';

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
  const dispatch = useAppDispatch();
  const router = useRouter()
  const {session} = props;
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [joinGameCode, setJoinGameCode] = useState('');
  const [userIsChangingDisplayName, setUserIsChangingDisplayName] =
    useState(false);
  const [displayName, setDisplayName] = useState('');
  const userDisplayName = useAppSelector((state) => state.user.userDisplayName);
  const userId = useAppSelector((state) => state.user.userId);

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

  const createGame = async () => {
    try {
      const createTiviaGame = await fetch(
        'api/create/triviaGame',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId }),      
        }
      );
      const newTriviaGame = await createTiviaGame.json();
      if (newTriviaGame.joinCode) {
        router.push(`create/${newTriviaGame.joinCode}`)
      }
    } catch (err) {
      if (err) console.log(err);
    }
  }

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

          {props ? (
            <div>
              <div>
                <h3>Draft Games</h3>
              </div>
              <div>
                {props.draftGames.map(draftGame => (
                  <Link href={`/create/${draftGame.joinCode}`}>
                    <button>
                      Game created {draftGame.createdAt}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className={buttonContainer}>
            <div className={buttonSection}>
              <button
                className={homePageButtons}
                onClick={createGame}
              >
                Create A Game
              </button>
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

export default Dashboard;