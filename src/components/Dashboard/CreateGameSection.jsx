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
import PlayGameSection from './PlayGameSection'

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

const CreateGameSection = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isCreatingAGame, setIsCreatingAGame] = useState(false)
  const [gameRoundAmount, setGameRoundAmount] = useState(0)
  const userId = useAppSelector((state) => state.user.userId)
  //change that to a createGameSlice dispatch
  const createGame = async () => {
    try {
      //dispatch()
      
      // const createTiviaGame = await fetch(
      //   'api/create/triviaGame',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ userId }),      
      //   }
      // );
      // const newTriviaGame = await createTiviaGame.json();
      // if (newTriviaGame.joinCode) {
      //   router.push(`create/${newTriviaGame.joinCode}`)
      // }
    } catch (err) {
      if (err) console.log(err);
    }
  }

  return (
    <div className={buttonSection}>
      {isCreatingAGame ? (
        <div>
          <div>
            <input
              type="number"
              name="gameRoundAmount"
              value={gameRoundAmount}
              onChange={(e) => setGameRoundAmount(gameRoundAmount + 1)}
            ></input>
          </div>
          <div>
            <button className={homePageButtons} onClick={createGame}>
              Create Game
            </button>
          </div>
        </div>
      ) : (
        <button
          className={homePageButtons}
          onClick={() => setIsCreatingAGame(true)}
        >
          Create A Game
        </button>
      )}
    </div>
  );
}

export default CreateGameSection;