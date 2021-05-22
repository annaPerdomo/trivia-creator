import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PlayGame({questions}) {
  const [triviaId, setTriviaId] = useState(null);
  useEffect(() => {
    if (questions && !triviaId) {
      setTriviaId(questions[0].triviaId);
    }
  }, [])
  console.log({questions});
  const router = useRouter();
  const roundNum = router.query.round.split('-')[1];
  const submitAnswers = async () => {

  }
  return (
    <div>
      <h1>Round {roundNum}</h1>
      <div>
        <ul>
          {questions.map(question => {
            return (
              <li>{question.content}</li>
              )
            })}
        </ul>
      </div>
      {/* <Link href={`/game/${triviaId}/round-${roundNum}/overview`}> */}
        <button onClick={submitAnswers}>Submit</button>
      {/* </Link> */}
    </div>
  )
}


