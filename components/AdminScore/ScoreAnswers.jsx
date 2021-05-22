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
      <Link href={`/game/${triviaId}/round-${Number(roundNum) + 1}/admin/play`}>
        <button>Next</button>
      </Link>
    </div>
  );
}
