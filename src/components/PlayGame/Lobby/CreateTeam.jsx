import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from '../../../../lib/hooks'
import Link from 'next/link'
import {createTriviaTeam} from '../../../redux/reducers/playGameSlice'

export default function CreateTeam(props) {
  const {session, triviaGame, isAlreadyInTeam} = props
  const dispatch = useAppDispatch();
  const [teamName, setTeamName] = useState('');
  const createTeam = async () => {
    const teamNameExists = teamName.length > 0
    if (teamNameExists) {
      if (isAlreadyInTeam) {
        alert('You have to leave a group before creating another group')
      } else {
        dispatch(createTriviaTeam(
          { 
            teamName,
            triviaId: triviaGame.id,
            userId: Number(session.user.id), 
          }
        ))
        setTeamName('')
      }
    } else {
      alert('In order to create a team you need a name')
    }
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