// @ts-check
import * as React from 'react';
import Link from 'next/link';

import styles from "../../styles/Home.module.css";

const { buttonSection, homePageButtons } = styles;

const PlayGameSection = () => {
  const [isJoiningGame, setIsJoiningGame] = React.useState(false);
  const [joinGameCode, setJoinGameCode] = React.useState('');

  return (
    <div>
      {isJoiningGame ? (
        <div>
          <div>
            <input
              type="text"
              name="joinGameCode"
              placeholder="Enter Game Code"
              value={joinGameCode}
              onChange={(e) => setJoinGameCode(e.target.value)}
            ></input>
          </div>
          <div>
            <Link href={`/game/${joinGameCode}/lobby`}>
              <button>Go To Game Lobby</button>
            </Link>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsJoiningGame(true)}
        >
          Play A Game
        </button>
      )}
    </div>
  );
}

export default PlayGameSection;