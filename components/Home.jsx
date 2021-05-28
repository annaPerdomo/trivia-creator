import React, {useEffect, useState} from 'react';
import { signin, signIn, signOut, useSession } from "next-auth/client";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
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

export default function Home() {
  const [session, loading] = useSession();
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [joinGameCode, setJoinGameCode] = useState('');
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.log('❕❗️❕❗️RefreshAccessTokenError!!', session);
      signIn(); // Force sign in to hopefully resolve error
    }
    if (session) {
      console.log({session});
    }
  }, [session]);
  return (
    <div className={container}>
      <div className={welcomeBanner}>
        <h1>Welcome to Trivia DeathMatch&trade;</h1>
      </div>
      {!session ? (
        <div className={`${buttonContainer}, ${signInButtonContainer}`}>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      ) : (
        <div>
          <div className={signOutButtonContainer}>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <div className={buttonContainer}>
            <div className={buttonSection}>
              <Link href="/create">
                <button className={homePageButtons}>Create A Game</button>
              </Link>
            </div>
            <div className={divider}></div>
            <div className={buttonSection}>
              <button
                className={homePageButtons}
                onClick={() => setIsJoiningGame(true)}
              >
                Play A Game
              </button>
              {isJoiningGame ? (
                <div>
                  <input
                    type="text"
                    name="joinGameCode"
                    value={question}
                    onChange={(e) => setJoinGameCode(e.target.value)}
                  ></input>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
