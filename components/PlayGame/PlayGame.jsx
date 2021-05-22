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
    try {
      const newAnswerData = {
        answers: [
          {
            questionId: 1,
            teamName: 'Andy Samberg and the Luls',
            content: 'Jizz in my Pants',
          },
          {
            questionId: 3,
            teamName: 'Andy Samberg and the Luls',
            content: 'Dick in a Box',
          },
          {
            questionId: 4,
            teamName: 'Andy Samberg and the Luls',
            content: 'Threw it on the Ground',
          },
          {
            questionId: 5,
            teamName: 'Andy Samberg and the Luls',
            content: 'I Just Had Sex',
          },
          {
            questionId: 2,
            teamName: 'Andy Samberg and the Luls',
            content: '3-Way (The Golden Rule)',
          },
        ]
      }
      const newAnswer = await fetch(
        '/api/create/answers',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newAnswerData),
        }
      );
      const newAnswerBody = await newAnswer.json();
      console.log({newAnswerBody})
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
              <li key={index}>{question.content}</li>
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


