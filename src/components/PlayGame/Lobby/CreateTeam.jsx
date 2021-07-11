import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function CreateTeam() {
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  
  const createTeam = async () => {

  }
  return (
    <div>
      <label htmlFor="newGroup">Group Name: </label>
      <input
        type="text"
        name="newGroupName"
        value={newTeamName}
        onChange={(e) => setNewTeamName(e.target.value)}
      ></input>
      <button type="button" onClick={createTeam}>
        Create Group
      </button>
    </div>  
  )
}