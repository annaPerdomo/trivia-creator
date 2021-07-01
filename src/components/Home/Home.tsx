// @ts-check
import React, { useEffect } from 'react';
import { signIn, useSession } from "next-auth/client";
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from "../../styles/Home.module.css";
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

export const Home: React.FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
    if (session && session.user) {
      router.push('/dashboard')
    }
  }, [session]);
  return (
    <div className={container}>
      <div  className={welcomeBanner}>
        <h1>Welcome to Trivia-Creator&trade;</h1>
      </div>
      {!session ? (
        <div className={`${buttonContainer}, ${signInButtonContainer}`}>
          <div>
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}