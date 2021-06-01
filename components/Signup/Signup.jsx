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

export default function Signup() {
  const [email, setEmail] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const signupWithEmail = async () => {
    console.log('signup with email clicked');
  }
  return (
    <div>
      <h5>Signup</h5>
      <div>
        <button>Create account with Google Login</button>
      </div>
      <br />
      <h5>Or</h5>
      <div>
        <form>
          <div>
            <label htmlFor="email">E-mail address:</label>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
          </div>
          <div>
            <label htmlFor="email">Preferred name: </label>
            <input
                type="text"
                name="preferredName"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
              ></input>
          </div>
            <div>
              <button type="button" onClick={signupWithEmail}>
                Send me a magic link
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}