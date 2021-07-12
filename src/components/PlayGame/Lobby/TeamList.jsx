import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from "../../../../lib/hooks";
import { deleteSelfFromTeam, setTeam, removeTeam } from "../../../redux/reducers/playGameSlice";

export default function TeamList(props) {
  const {triviaId, userId, isAlreadyInTeam, setIsAlreadyInTeam} = props
  const dispatch = useAppDispatch()
  const [teams, setTeams] = useState(null)
  const [firstTeamId, setFirstTeamId] = useState(null)
  const isGameHost = useAppSelector(state => state.playGame.isGameHost)
  const fetchTeams = async () => {
    try {
      setIsAlreadyInTeam(false)
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
            setIsAlreadyInTeam(true)
            setFirstTeamId(team.id)
            dispatch(
              setTeam({teamId: Number(team.id), teamName: team.teamName}))
          }
        })
      })
      setTeams(triviaGame.teams)
    } catch (err) {
      if (err) console.log(err)
    }
  }

  useEffect(() => {
    fetchTeams()
    setInterval(fetchTeams, 5000)
  }, [])

  const joinTeam = async (newTeamId) => {
    try {
      if (!isAlreadyInTeam) {        
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
        const newTeam = await updateTeam.json()
        dispatch(setTeam({
          teamId: Number(newTeam.id),
          teamName: newTeam.teamName
        }))
        fetchTeams()
      } else {
        alert('You can only be in one group at a time')
      }
    } catch (err) {
      if (err) console.log(err)
    }
  }

  const leaveTeam = async (teamId) => {
    try {
      const removeMemberFromTeam = await fetch("/api/delete/memberFromTeam", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamId: Number(teamId),
          userId: Number(userId),
        }),
      });
      setFirstTeamId(null);
      dispatch(removeTeam());
      fetchTeams();
    } catch (err) {
      if (err) console.log(err);
    }
  };

  const deleteTeam = async (teamId) => {
    try {
      const deleteTeam = await fetch('/api/delete/team', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ teamId }),
      })
      dispatch(deleteSelfFromTeam({deletedTeamId: teamId}))
      fetchTeams()
    } catch (err) {
      if (err) console.log(err)
    }
  }

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
                    ? team.members.reduce(
                        (memberString, member, memberIndex) => {
                          if (Number(member.id) === Number(userId)) {
                            memberString += "You";
                          } else {
                            memberString += `${member.displayName}`;
                          }
                          if (memberIndex !== team.members.length - 1) {
                            memberString += ", ";
                          }
                          return memberString;
                        },
                        ""
                      )
                    : "lonely sad team"}
                </span>
                {team.id === firstTeamId ? (
                  <button onClick={() => leaveTeam(team.id)}>Leave Team</button>
                ) : (
                  <button onClick={() => joinTeam(team.id)}>Join Team</button>
                )}
                {isGameHost ? (
                  <button onClick={() => deleteTeam(team.id)}>
                    Delete Team 
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}