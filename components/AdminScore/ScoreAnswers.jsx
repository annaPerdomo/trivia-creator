import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function ScoreAnswers({ questions }) {
  const [triviaId, setTriviaId] = useState(null);
  useEffect(() => {
    if (questions && !triviaId) {
      setTriviaId(questions[0].triviaId);
    }
  }, []);
  const router = useRouter();
  const roundNum = router.query.round.split('-')[1];
  return (
    <div>
      <h1>Round {roundNum}</h1>
      <div>
        <ul>
          {questions.map((question, index) => {
            return (
              <li key={index}>
                {question.content}
                <ul>
                  {question.answers.map((answer, index) => (
                    <li key={index}>
                      {answer.teamName}:{' ' + answer.content}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <Link href={`/game/${triviaId}/round-${Number(roundNum) + 1}/admin/play`}>
        <button>Next</button>
      </Link>
    </div>
  );
}
