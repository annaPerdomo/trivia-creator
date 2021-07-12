import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'


//maybe you can create some sort of team and users join table?
//handle the case of a user already having joined a team
//also display the users in the teams

export default function TeamList({triviaId, userId}) {
  const [teams, setTeams] = useState(null)
  const [firstTeamId, setFirstTeamId] = useState(null)
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
      triviaGame.teams.forEach(team => {
        team?.members.forEach(member => {
          if (Number(member.id) === Number(userId)) {
            setFirstTeamId(team.id)
          }
        })
      })
      setTeams(triviaGame.teams)
    } catch (err) {
      if (err) console.log(err)
    }
  }
  console.log({firstTeamId})
  const joinTeam = async (newTeamId) => {
    try {
      const updateTeam = await fetch('/api/update/teams', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newTeamId: Number(newTeamId), 
          originalTeamId: Number(firstTeamId), 
          userId: Number(userId)
        }),
      })
      const triviaGame = await updateTeam.json()
    } catch (err) {
      if (err) console.log(err)
    }
  }
  //http://localhost:3000/game/uilj/lobby
  return (
    <div>
      Teams:
      {teams?.length ? (
        <div>
          {teams.map((team, index) => {
            return (
              <div key={index}>
                {`${index + 1}: ${team.teamName} - `}
                <span>
                  {team?.members?.length
                    ? team.members.reduce((memberString, member, memberIndex) => {
                        if (Number(member.id) === Number(userId)) {
                          memberString += "You";
                        } else {
                          memberString += `${member.displayName}`;
                        }
                        if (memberIndex !== team.members.length - 1) {
                          memberString += ', '
                        }
                        return memberString;
                      }, "")
                    : "lonely sad team"}
                </span>
                <button onClick={() => joinTeam(team.id)}>
                    Join Team
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
      <button onClick={() => fetchTeams()}>click me</button>
    </div>
  );
}