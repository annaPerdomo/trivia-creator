import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import { setGame, setTeam } from "../../redux/reducers/playGameSlice";
import { grabUsersTeamAndId } from "../../../lib/helperFunctions/runOnClient";

export default function PlayGame(props) {
  const {questions, session, triviaGame} = props;
  const dispatch = useAppDispatch()
  const isGameHost = useAppSelector(state => state.playGame.isGameHost)
  const triviaId = useAppSelector(state => state.playGame.triviaId)
  const teamId = useAppSelector(state => state.playGame.teamId)
  const teamName = useAppSelector(state => state.playGame.teamName)
  const [roundAnswers, setRoundAnswers] = useState({})
  console.log({roundAnswers})
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
  const router = useRouter();
  const roundNum = router.query.round.split('-')[1];
  const submitAnswers = async () => {
    try {
      if (!isGameHost) {
        const newAnswerData = {
          answers: [
            {
              questionId: 6,
              teamName: 'Andy Samberg and the Luls',
              content: 'Ascension',
            },
            {
              questionId: 7,
              teamName: 'Andy Samberg and the Luls',
              content: 'Numb Numb Juice',
            },
            {
              questionId: 8,
              teamName: 'Andy Samberg and the Luls',
              content: 'Physical',
            },
            {
              questionId: 9,
              teamName: 'Andy Samberg and the Luls',
              content: 'Tempo',
            },
            {
              questionId: 10,
              teamName: 'Andy Samberg and the Luls',
              content: 'Work Bitch',
            },
          ]
        }
        // const newAnswer = await fetch(
        //   '/api/create/answers',
        //   {
        //     method: 'POST',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(newAnswerData),
        //   }
        // );
        // const newAnswerBody = await newAnswer.json();
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
                    // value={question}
                    onChange={(e) => {
                      const answer = {
                        questionId: Number(question.id),
                        teamName, 
                        teamId, 
                        content: e.target.value
                      }
                      setRoundAnswers[Number(question.id)] = answer
                      //setRoundAnswers([...roundAnswers, answer]);
                    }}
                  />
                </div>
              </div>
          )})}
        </ul>
      </div>
      <Link
        href={
          isGameHost
            ? `/game/${triviaId}/round-${roundNum}/admin/score`
            : `/game/${triviaId}/round-${roundNum}/overview`
        }
      >
        <button onClick={submitAnswers}>Submit</button>
      </Link>
    </div>
  );
}


