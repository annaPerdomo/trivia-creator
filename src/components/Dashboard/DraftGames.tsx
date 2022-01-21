// @ts-check
import * as React from 'react'
import Link from 'next/link';

import styles from "../../styles/DraftGames.module.css";

const {
  draftGamesBody,
  draftGamesContainer,
  draftGamesFooter,
  draftGamesHeader
} = styles;

interface Props {
  draftGames: any;
}

const DraftGames: React.FC <Props> = ({ draftGames }) => {
  return (
    <div className={draftGamesContainer}>
      <div className={draftGamesHeader}>
        <h3>Draft Games</h3>
      </div>

      <div className={draftGamesBody}>
        {draftGames.map((draftGame) => (
          <Link href={`/create/${draftGame.joinCode}`} key={draftGame.id}>
            <button>Game started {draftGame.createdAt}</button>
          </Link>
        ))}
      </div>

      <div className={draftGamesFooter} />

    </div>
  );
};

export default DraftGames