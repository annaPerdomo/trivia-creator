import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import CreateTeam from './CreateTeam';
import { useAppSelector, useAppDispatch } from "../../../../lib/hooks";
import TeamList from './TeamList'
import { setGame } from "../../../redux/reducers/playGameSlice";

export default function GameLobby(props) {  
  const {session, triviaGame} = props;
  const dispatch = useAppDispatch();
  const [isAlreadyInTeam, setIsAlreadyInTeam] = useState(false)
  const isGameHost = useAppSelector(state => state.playGame.isGameHost)
  useEffect(() => {
    if (session && triviaGame) {
      dispatch(setGame({
        hostId: Number(triviaGame.hostId), 
        triviaId: Number(triviaGame.id),
        userId: Number(session.user.id)
      }))
    }
  }, [])
  const startGame = async () => {
    try {
      const updateGame = await fetch('/api/update/triviaGame', {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          triviaId: triviaGame.id
        }),
      })
      const updatedGame = await updateGame.json()
    } catch (err) {
      if (err) console.log(err)
    }
  }
  return (
    <div>
      <div>
        <h1>Welcome to The Game Lobby</h1>
      </div>
      {!Object.keys(triviaGame).length ? (
        <div>
          <p>
            Hmmmm the code doesn't pull up an applicable trivia game.
            <br />
            Please check the code and try again
          </p>
        </div>
      ) : (
        <div>
          <div>
            <TeamList
              isAlreadyInTeam={isAlreadyInTeam}
              setIsAlreadyInTeam={setIsAlreadyInTeam}
              triviaId={triviaGame?.id}
              userId={session?.user?.id}
            />
          </div>
          <div>
            <CreateTeam
              isAlreadyInTeam={isAlreadyInTeam}
              session={session}
              triviaGame={triviaGame}
            />
          </div>
          {isGameHost ? (
            <div>
              <button onClick={() => startGame()}>Start Game</button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}