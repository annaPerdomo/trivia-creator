import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'


//maybe you can create some sort of team and users join table?
//handle the case of a user already having joined a team
//also display the users in the teams

export default function TeamList({triviaId, userId}) {
  const [teams, setTeams] = useState(null)
  const fetchTeams = async () => {
    try {
      const currentTeamsGames = await fetch('/api/get/teams', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({triviaId}),
      })
      const triviaGame = await currentTeamsGames.json()
      setTeams(triviaGame.teams)
    } catch (err) {
      if (err) console.log(err)
    }
  }
  return (
    <div>
      Teams:
      {teams?.length ? (
        <div>
          {teams.map((team, index) => (
            <div key={index}>
              {`${index + 1}: ${team.teamName} - `}
              <span>
                {team?.members ? (
                  team.members.reduce((memberString, member) => {
                    if (Number(member.id) === Number(userId)) {
                      memberString += 'You, '
                    } else {
                      memberString += `${member.displayName}, `
                    }
                    return memberString
                  }, '')
                ) : 'lonely sad team'}
              </span>
              <button>Join Team</button>
            </div>
          ))}
        </div>
      ) : null}
      <button onClick={() => fetchTeams()}>click me</button>
    </div>  
  )
}