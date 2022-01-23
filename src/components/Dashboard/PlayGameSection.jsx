// @ts-check
import * as React from "react";
import Link from "next/link";

import commonStyles from "../../styles/CommonStyles.module.css";

const {
  centeredHeader,
  contentContainer,
  headerWithBorder,
  noMargin,
  sectionHeight,
} = commonStyles;

const PlayGameSection = () => {
  const [joinGameCode, setJoinGameCode] = React.useState("");

  return (
    <div className={sectionHeight}>
      <div className={`${centeredHeader} ${headerWithBorder}`}>
        <h4 className={noMargin}>PLAY A GAME</h4>
      </div>

      <div className={contentContainer}>
        <input
          type="text"
          name="joinGameCode"
          placeholder="Enter Game Code"
          value={joinGameCode}
          onChange={(e) => setJoinGameCode(e.target.value)}
        />

        <Link href={`/game/${joinGameCode}/lobby`}>
          <button>Go To Game Lobby</button>
        </Link>
      </div>
    </div>
  );
};

export default PlayGameSection;
