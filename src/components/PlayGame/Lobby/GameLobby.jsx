import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import CreateTeam from './CreateTeam';
import { useAppDispatch } from "../../../../lib/hooks";
import TeamList from './TeamList'
import { setGame } from "../../../redux/reducers/playGameSlice";

export default function GameLobby(props) {  
  const {session, triviaGame} = props;
  const dispatch = useAppDispatch();
  const [isAlreadyInTeam, setIsAlreadyInTeam] = useState(false)
  useEffect(() => {
    if (session && triviaGame) {
      dispatch(setGame({
        hostId: Number(triviaGame.hostId), 
        triviaId: Number(triviaGame.id),
        userId: Number(session.user.id)
      }))
    }
  }, [])
  return (
    <div>
      <div>
        <h1>Welcome to The Game Lobby</h1>
      </div>
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
    </div>
  )
}