import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function RoundOverview({questions}) {
  //maybe display a loader until Daniel has everything scored 🤔
  const [roundScore, setRoundScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const router = useRouter();
  const roundNum = Number(router.query.round.split('-')[1]);

  useEffect(() => {
    if (questions && !roundScore) {
      const currentRoundQuestions = questions.filter(question => question.roundNum === roundNum);
      calculateScores(questions, setTotalScore);
      calculateScores(currentRoundQuestions, setRoundScore);
    }
  }, [])
  const calculateScores = async (currentQuestions, setScore) => {
    const roundTeamScores = {};
    currentQuestions.forEach(question => {
      if (question.answers) {
        question.answers.forEach(answer => {
          if (!roundTeamScores[answer.teamName]) {
            roundTeamScores[answer.teamName] = 0;
          }
          if (answer.isCorrect) {
            roundTeamScores[answer.teamName]++;
          }
        })
      }
    });
    setScore(roundTeamScores);
  }
  return (
    <div>
      <h3>Round {roundNum} Scores</h3>
      <div>
        {roundScore ?
          Object.keys(roundScore).map(teamName => {
            const teamScore = roundScore[teamName];
            return (
              <div>{teamName}: {teamScore}{' points earned this round'}</div>
            )
          })
        : null}
      </div>
      <h3>Total Scores</h3>
      <div>
        {totalScore ?
            Object.keys(totalScore).map(teamName => {
              const teamScore = totalScore[teamName];
              return (
                <div>{teamName}: {teamScore}{' points earned this game'}</div>
              )
            })
          : null}
      </div>
      <div>
        <Link href={`/game/1/round-${roundNum + 1}/play`}>
          <button>Go to Round {roundNum + 1}</button>
        </Link>
      </div>
    </div>
  );
}


