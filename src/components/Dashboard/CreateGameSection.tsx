// @ts-check
import * as React from "react";
import { useRouter } from "next/router";

import { useAppSelector, useAppDispatch } from "../../../lib/hooks";

import { createNewTriviaGame } from "../../redux/reducers/createGameSlice";
import commonStyles from "../../styles/CommonStyles.module.css";
import styles from "../../styles/CreateGameSection.module.css";

const {
  centeredHeader,
  contentContainer,
  headerWithBorder,
  noMargin,
  sectionHeight,
} = commonStyles;

// const {  } = styles;

const CreateGameSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [gameRoundAmount, setGameRoundAmount] = React.useState(0);

  const userId = useAppSelector((state) => Number(state.user.userId));
  const joinCode = useAppSelector((state) => state.createGame.joinCode);

  const createGame = async (): Promise<void> => {
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

  React.useEffect(() => {
    if (joinCode) {
      router.push(`/create/${joinCode}`);
    }
  }, [joinCode]);

  return (
    <div className={sectionHeight}>
      <div className={`${centeredHeader} ${headerWithBorder}`}>
        <h4 className={noMargin}>CREATE NEW GAME</h4>
      </div>

      <div className={contentContainer}>
        <div>
          <label htmlFor="row-amount">Enter desired amount of rounds:</label>

          <select
            id="row-amount"
            name="row-amount"
            onChange={(e: any): void =>
              setGameRoundAmount(Number(e.target.value))
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option selected value="5">
              5
            </option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <button onClick={createGame}>Create Game</button>
      </div>
    </div>
  );
};

export default CreateGameSection;
