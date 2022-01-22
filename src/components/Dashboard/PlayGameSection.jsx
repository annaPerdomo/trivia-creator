// @ts-check
import * as React from "react";
import Link from "next/link";

import commonStyles from "../../styles/CommonStyles.module.css";

const { centeredHeader, contentContainer, headerWithBorder, noMargin, sectionHeight } =
  commonStyles;

const PlayGameSection = () => {
  const [isJoiningGame, setIsJoiningGame] = React.useState(false);
  const [joinGameCode, setJoinGameCode] = React.useState("");

  return (
    <div className={sectionHeight}>
      <div className={`${centeredHeader} ${headerWithBorder}`}>
        <h4 className={noMargin}>PLAY A GAME</h4>
      </div>

      <div className={contentContainer}>
        <div>
          <input
            type="text"
            name="joinGameCode"
            placeholder="Enter Game Code"
            value={joinGameCode}
            onChange={(e) => setJoinGameCode(e.target.value)}
          />
        </div>
        <div>
          <Link href={`/game/${joinGameCode}/lobby`}>
            <button>Go To Game Lobby</button>
          </Link>
        </div>
      </div>
    </div>
    // <div>
    //   {isJoiningGame ? (
    //     <div>
    //       <div>
    //         <input
    //           type="text"
    //           name="joinGameCode"
    //           placeholder="Enter Game Code"
    //           value={joinGameCode}
    //           onChange={(e) => setJoinGameCode(e.target.value)}
    //         ></input>
    //       </div>
    //       <div>
    //         <Link href={`/game/${joinGameCode}/lobby`}>
    //           <button>Go To Game Lobby</button>
    //         </Link>
    //       </div>
    //     </div>
    //   ) : (
    //     <button
    //       onClick={() => setIsJoiningGame(true)}
    //     >
    //       Play A Game
    //     </button>
    //   )}
    // </div>
  );
};

export default PlayGameSection;
