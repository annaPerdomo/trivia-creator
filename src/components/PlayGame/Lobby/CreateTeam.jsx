import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from '../../../../lib/hooks'
import Link from 'next/link'
import {createTriviaTeam} from '../../../redux/reducers/playGameSlice'

export default function CreateTeam(props) {
  const {session, triviaGame} = props
  const dispatch = useAppDispatch();
  const [teamName, setTeamName] = useState('');
  
  const createTeam = async () => {
    dispatch(createTriviaTeam(
      { 
        teamName,
        triviaId: triviaGame.id,
        userId: Number(session.user.id), 
      }
    ))
    setTeamName('')
  }
  return (
    <div>
      <label htmlFor="newGroup">Group Name: </label>
      <input
        type="text"
        name="newGroupName"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      ></input>
      <button type="button" onClick={createTeam}>
        Create Group
      </button>
    </div>  
  )
}