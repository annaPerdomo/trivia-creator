import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function PlayGame({questions}) {
  const [triviaId, setTriviaId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (questions && !triviaId) {
      setTriviaId(questions[0].triviaId);
    }
    const urlPath = router.route.split('/')[4];
    setIsAdmin(urlPath === "admin")
  }, [])
  const router = useRouter();
  const roundNum = router.query.round.split('-')[1];
  const submitAnswers = async () => {
    try {
      if (!isAdmin) {
        const newAnswerData = {
          answers: [
            {
              questionId: 1,
              teamName: 'Karen from Finance',
              content: 'Spring Break Anthem',
            },
            {
              questionId: 3,
              teamName: 'Karen from Finance',
              content: 'I\'m On A Boat',
            },
            {
              questionId: 4,
              teamName: 'Karen from Finance',
              content: 'Motherlover',
            },
            {
              questionId: 5,
              teamName: 'Karen from Finance',
              content: 'I Just Had Sex',
            },
            {
              questionId: 2,
              teamName: 'Karen from Finance',
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
            return <li key={index}>{question.content}</li>;
          })}
        </ul>
      </div>
      <Link
        href={
          isAdmin
            ? `/game/${triviaId}/round-${roundNum}/admin/score`
            : `/game/${triviaId}/round-${roundNum}/overview`
        }
      >
        <button onClick={submitAnswers}>Submit</button>
      </Link>
    </div>
  );
}


