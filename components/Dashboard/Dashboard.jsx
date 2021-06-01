import React, {useEffect, useState} from 'react';
import { signin, signIn, signOut, useSession } from "next-auth/client";
import Link from 'next/link';
import styles from "../../styles/Home.module.css";
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const [session, loading] = useSession();
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [joinGameCode, setJoinGameCode] = useState('');
  useEffect(( ) => {
    if (!session) {
      router.push('/')
    }
  }, [session, loading])
  return (
    <div className={container}>
      <div className={welcomeBanner}>
        <h1>Welcome to Trivia-Creator&trade;</h1>
      </div>
      {session ? (
        <div>
          <div>
            <h4>
              You look beautiful today {session.user.name || session.user.email}
            </h4>
          </div>
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