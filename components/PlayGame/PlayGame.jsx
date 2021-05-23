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


