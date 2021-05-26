import React, {useEffect} from 'react';
import { signIn, useSession } from "next-auth/client";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
const {
  buttonContainer,
  buttonSection,
  container,
  divider,
  homePageButtons,
  welcomeBanner,
} = styles;

export default function Home() {
  const [session] = useSession();
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.log('❕❗️❕❗️RefreshAccessTokenError!!', session);
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);
  return (
    <div className={container}>
      <div className={welcomeBanner}>
        <h1>Welcome to Trivia DeathMatch&trade;</h1>
      </div>
      <div className={buttonContainer}>
        <div className={buttonSection}>
          <Link href="/create">
            <button className={homePageButtons}>Create A Game</button>
          </Link>
        </div>
        <div className={divider}></div>
        <div className={buttonSection}>
          <button className={homePageButtons}>Start A Game</button>
        </div>
      </div>
    </div>
  );
}
