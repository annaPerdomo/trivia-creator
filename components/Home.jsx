import React, {useEffect} from 'react';
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
              <button className={homePageButtons}>Play A Game</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
