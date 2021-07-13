import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function RoundOverview({questions}) {
  console.log({questions})
  const [roundScore, setRoundScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const router = useRouter();
  const roundNum = Number(router.query.round.split('-')[1]);
  const joinCode = router.query.joinCode;
  useEffect(() => {
    if (questions && !roundScore) {
      const currentRoundQuestions = questions.filter(question => question.roundNum === roundNum);
      calculateAllScoresInOneLoop();
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
    console.log({roundTeamScores})
    setScore(roundTeamScores);
  }

  const calculateAllScoresInOneLoop = async () => {
    const roundTeamScores = {};
    const allTeamScores = {};
    questions.forEach((question,  index) => {
      if (question?.answsers?.length) {
        question.answers.forEach((answerData, index) => {
          if (!roundTeamScores[answerData.teamName]) {
            roundTeamScores[answer.teamName] = {
              total: 0,
              round: 0
            }
          }
          if (answer.isCorrect) {
            roundTeamScores[answer.teamName].total++
            if (question.roundNum === roundNum) {
              roundTeamScores[answer.teamName].round++
            }
          }
        })
      }
    })
    console.log('allscoresinoneloop version of roundTeamScores', {roundTeamScores, allTeamScores})
  }

  return (
    <div>
      <h3>Round {roundNum} Scores</h3>
      <div>
        {roundScore ?
          Object.keys(roundScore).map((teamName, index) => {
            const teamScore = roundScore[teamName];
            return (
              <div key={index} >{teamName}: {teamScore}{' points earned this round'}</div>
            )
          })
        : null}
      </div>
      <h3>Total Scores</h3>
      <div>
        {totalScore ?
            Object.keys(totalScore).map((teamName, index) => {
              const teamScore = totalScore[teamName];
              return (
                <div key={index}>{teamName}: {teamScore}{' points earned this game'}</div>
              )
            })
          : null}
      </div>
      <div>
        <Link href={`/game/${joinCode}/round-${roundNum + 1}/play`}>
          <button>Go to Round {roundNum + 1}</button>
        </Link>
      </div>
    </div>
  );
}


