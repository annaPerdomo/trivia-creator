// @ts-check
import * as React from 'react';
const {useEffect, useState} = React;
import { useRouter } from 'next/router'
import styles from "../../styles/Home.module.css";
import { createNewTriviaGame } from '../../redux/reducers/createGameSlice';
import { useAppSelector, useAppDispatch } from '../../../lib/hooks';
const {
  buttonSection,
  homePageButtons,
} = styles;

const CreateGameSection = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isCreatingAGame, setIsCreatingAGame] = useState(false);
  const [gameRoundAmount, setGameRoundAmount] = useState(0);
  const userId = useAppSelector((state) => Number(state.user.userId));
  const joinCode = useAppSelector((state) => state.createGame.joinCode);
  const createGame = async () => {
    try {
      const rounds = [];
      for (let i = 0; i < gameRoundAmount; i++) {
        rounds.push({
          roundNum: i + 1,
        });
      }
      dispatch(
        createNewTriviaGame({
          userId,
          rounds,
        })
      );
    } catch (err) {
      if (err) console.log(err);
    }
  };
  useEffect(() => {
    if (joinCode) {
      router.push(`/create/${joinCode}`);
    }
  }, [joinCode]);
  return (
    <div>
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
            <button onClick={createGame}>
              Create Game
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsCreatingAGame(true)}
        >
          Create A Game
        </button>
      )}
    </div>
  );
};

export default CreateGameSection;