import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { useAppSelector, useAppDispatch } from "../../../../../lib/hooks";
import { useAppSelector, useAppDispatch } from "../../../../lib/hooks";
import { setGame } from "../../../redux/reducers/playGameSlice";


export default function ScoreAnswers(props) {
  const {questions, session, triviaGame} = props;
  const router = useRouter();
  const dispatch = useAppDispatch()
  const triviaId = useAppSelector(state => state.playGame.triviaId)
  useEffect(() => {
    if (session && triviaGame && !triviaId) {
      dispatch(setGame({
        hostId: Number(triviaGame.hostId), 
        triviaId: Number(triviaGame.id),
        userId: Number(session.user.id)
      }))
    }
  }, [])
  const roundNum = router.query.round.split('-')[1];
  const joinCode = router.query.joinCode;
  const markAsTrue = async (answerData) => {
    const updatedAnswer = await fetch(
      '/api/update/answers',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({answerId: answerData.id}),
      }
    );
    const updatedAnswerBody = await updatedAnswer.json();
  }
  return (
    <div>
      <h1>Round {roundNum}</h1>
      <div>
        <ul>{questions ? (
          questions.map((question, index) => {
            return (
              <li key={index}>
                {question.content}
                <ul>{question.answers.length ? (
                  question.answers.map((answer, index) => (
                    <div>
                      <li key={index}>
                        {answer.teamName}:{' ' + answer.content}
                        <button onClick={() => markAsTrue(answer)}>Mark As True</button>
                      </li>
                    </div>
                  ))
                ) : (<div>No answers have been submitted yet</div>)}
                </ul>
              </li>
            );
          })
        ) : <div>No questions have been submitted yet</div>}
        </ul>
      </div>
      <Link href={`/game/${joinCode}/round-${roundNum}/overview`}>
        <button>Next</button>
      </Link>
    </div>
  );
}
