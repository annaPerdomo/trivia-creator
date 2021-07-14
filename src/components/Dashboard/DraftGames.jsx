// @ts-check
import * as React from 'react'
import Link from 'next/link';
import styles from "../../styles/Home.module.css";

const DraftGames = ({ draftGames }) => {
  return (
    <div>
      <div>
        <h3>Draft Games</h3>
      </div>
      <div>
        {draftGames.map((draftGame) => (
          <Link href={`/create/${draftGame.joinCode}`} key={draftGame.id}>
            <button>Game started {draftGame.createdAt}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DraftGames