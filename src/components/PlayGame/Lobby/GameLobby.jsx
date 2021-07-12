import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import CreateTeam from './CreateTeam';
import TeamList from './TeamList'

//ability to create team so an api cal for it
//have list of teams already made
//set stuff in database
export default function GameLobby(props) {  
  const {session, triviaGame} = props;
  return (
    <div>
      <div>
        <h1>Welcome to The Game Lobby</h1>
      </div>
      <div>
        <TeamList triviaId={triviaGame?.id} userId={session?.user?.id}/>
      </div>
      <div>
        <CreateTeam session={session} triviaGame={triviaGame}/>
      </div>
    </div>
  )
}