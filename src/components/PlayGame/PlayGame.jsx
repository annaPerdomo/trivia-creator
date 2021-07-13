import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { setGame, setTeam } from "../../redux/reducers/playGameSlice";
import { grabUsersTeamAndId } from "../../../lib/helperFunctions/runOnClient";

export default function PlayGame(props) {
  const {questions, session, triviaGame} = props;
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isGameHost = useAppSelector(state => state.playGame.isGameHost)
  const triviaId = useAppSelector(state => state.playGame.triviaId)
  const teamId = useAppSelector(state => state.playGame.teamId)
  const [roundAnswers, setRoundAnswers] = useState({})

  useEffect(() => {
    if (session && triviaGame && !triviaId) {
      dispatch(setGame({
        hostId: Number(triviaGame.hostId), 
        triviaId: Number(triviaGame.id),
        userId: Number(session.user.id)
      }))
      if (!teamId) {
        const userId = session.user.id
        const teamNameAndId = grabUsersTeamAndId(triviaGame.teams, userId)
        dispatch(setTeam(teamNameAndId))
      }
    }
  }, [])
  const roundNum = Number(router.query.round.split('-')[1]);
  const joinCode = router.query.joinCode;
  const submitAnswers = async () => {
    try {
      if (Object.values(roundAnswers).length) {
        const newAnswers = Object.values(roundAnswers);
        console.log({ newAnswers });
        const newAnswer = await fetch(
          '/api/create/answers',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({answers: newAnswers}),
          }
        );
        const newAnswerBody = await newAnswer.json();
        router.push(`/game/${joinCode}/round-${roundNum}/overview`)
      } else {
        alert('please submit answers before continuing')
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <h1>Round {roundNum}</h1>
      <div>
        <ul>
          {questions.map((question, index) => {
            return (
              <div>
                <div>
                  <label 
                    htmlFor="question">{isGameHost ? question.content : `Question ${ index + 1}: `}
                  </label>
                  <input
                    type="text"
                    name="question"
                    onChange={(e) => {
                      const answer = {
                        questionId: Number(question.id),
                        teamId, 
                        content: e.target.value
                      }
                      const test = roundAnswers;
                      test[Number(question.id)] = answer
                      setRoundAnswers(test)
                    }}
                  />
                </div>
              </div>
          )})}
        </ul>
      </div>
      {isGameHost? (
        <Link href={`/game/${joinCode}/round-${roundNum}/score`}>        
          <button>Score Round</button>
        </Link>
      ) : (
        <button onClick={submitAnswers}>Submit</button>
      )}
      {/* <button onClick={submitAnswers}>Submit</button> */}
    </div>
  );
}


